import { BadRequestException, Injectable } from '@nestjs/common';
import { BookSearchInput } from '../../api/models/book-search.input';
import { Book } from '../../api/models/book.model';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { BookCreateInput } from '../../api/models/book-create.input';
import { BookUpdateInput } from '../../api/models/book-update.input';
import { BookInventoryUpdateInput } from '../../api/models/book-inventory-update.input';
import { BookInventoryCreateInput } from '../../api/models/book-inventory-create.input';
import { BookDetails } from '../../api/models/book-details.model';

@Injectable()
export class BookService {
  constructor(private readonly db: PrismaService) {}

  async findBooks({
    query,
    categoryIds,
    authorIds,
    offset,
    limit,
  }: BookSearchInput): Promise<Book[]> {
    const where: Prisma.BookWhereInput = {};

    if (categoryIds) {
      where.bookCategories = { some: { categoryId: { in: categoryIds } } };
    }

    if (authorIds) {
      where.bookAuthors = { some: { authorId: { in: authorIds } } };
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    const books = await this.db.book.findMany({
      where,
      include: {
        bookAuthors: { include: { author: true } },
        bookCategories: { include: { category: true } },
        inventories: {
          where: { deletedAt: null },
          include: {
            inventoryReservations: {
              where: { returnedAt: null },
            },
          },
        },
      },
      skip: offset,
      take: limit,
    });

    return books.map(b => {
      const hasInventory = b.inventories.length > 0;
      const hasAvailableInventory = b.inventories.some(inv => !inv.inventoryReservations.length);
      const isAvailable = hasInventory && hasAvailableInventory;

      return {
        id: b.id,
        name: b.name,
        categories: b.bookCategories.map(bc => bc.category),
        authors: b.bookAuthors.map(bc => bc.author),
        description: b.description,
        previewUrl: b.previewUrl,
        isAvailable,
      };
    });
  }

  async create({
    name,
    description,
    previewUrl,
    categoryIds,
    authorIds,
    inventories,
  }: BookCreateInput): Promise<Book> {
    const book = await this.db.book.create({
      include: {
        bookAuthors: { include: { author: true } },
        bookCategories: { include: { category: true } },
        inventories: true,
      },
      data: {
        name,
        description,
        previewUrl,
        bookCategories: {
          create: categoryIds.map(categoryId => ({ categoryId })),
        },
        bookAuthors: {
          create: authorIds.map(authorId => ({ authorId })),
        },
        inventories: {
          create: inventories.map(({ serialNumber }) => ({ serialNumber })),
        },
      },
    });

    return {
      id: book.id,
      name,
      description,
      previewUrl,
      categories: book.bookCategories.map(bc => bc.category),
      authors: book.bookAuthors.map(bc => bc.author),
      isAvailable: inventories.length > 0,
    };
  }

  async getBookDetails(id: number): Promise<BookDetails> {
    const book = await this.db.book.findFirst({
      where: { id },
      include: {
        bookAuthors: { include: { author: true } },
        bookCategories: { include: { category: true } },
        inventories: {
          include: {
            inventoryReservations: {
              where: { returnedAt: null },
              take: 1,
              include: {
                customer: true,
              },
            },
          },
        },
      },
    });

    if (!book) {
      throw new BadRequestException('The Book does not exist');
    }

    return {
      id: book.id,
      name: book.name,
      description: book.description,
      previewUrl: book.previewUrl,
      categories: book.bookCategories.map(bc => bc.category),
      authors: book.bookAuthors.map(bc => bc.author),
      inventories: book.inventories.map(
        ({ id, serialNumber, deleteReason, inventoryReservations }) => ({
          id,
          serialNumber,
          deleteReason,
          activeReservation: inventoryReservations[0]
            ? {
                id: inventoryReservations[0].id,
                createdAt: inventoryReservations[0].createdAt?.getTime(),
                startAt: inventoryReservations[0].startAt?.getTime(),
                endAt: inventoryReservations[0].endAt?.getTime(),
                returnedAt: inventoryReservations[0].returnedAt?.getTime(),
                description: inventoryReservations[0].description,
                customer: inventoryReservations[0].customer,
              }
            : null,
        }),
      ),
      isAvailable: book.inventories.some(inv => !inv.deletedAt),
    };
  }

  async update({
    id,
    name,
    description,
    previewUrl,
    categoryIds,
    authorIds,
    updatedInventories,
    newInventories,
  }: BookUpdateInput): Promise<BookDetails> {
    await this.db.$transaction(async transaction => {
      await this.updateBookInfo({ name, description, previewUrl }, id, transaction);
      await this.updateBookCategories(categoryIds, id, transaction);
      await this.updateBookAuthors(authorIds, id, transaction);
      await this.updateBookInfo({ name, description, previewUrl }, id, transaction);
      await this.updateBookInventories(updatedInventories, id, transaction);
      await this.addBookInventories(newInventories, id, transaction);
    });

    return this.getBookDetails(id);
  }

  private async updateBookInventories(
    updatedInventories: BookInventoryUpdateInput[],
    bookId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    const existingInventory = await transaction.bookInventory.findMany({
      where: {
        bookId,
      },
    });

    for (const { id: invId, serialNumber } of updatedInventories) {
      const isInventoryExists = existingInventory.some(inv => inv.id === invId);

      if (!isInventoryExists) {
        throw new BadRequestException(`Inventory with id: ${invId} does not exist`);
      }

      await transaction.bookInventory.update({
        where: { id: invId },
        data: { serialNumber },
      });
    }
  }

  private async addBookInventories(
    newInventories: BookInventoryCreateInput[],
    bookId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    if (newInventories.length) {
      await transaction.bookInventory.createMany({
        data: newInventories.map(({ serialNumber }) => ({ serialNumber, bookId })),
      });
    }
  }

  private async updateBookCategories(
    categoryIds: number[],
    bookId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    await transaction.bookCategory.deleteMany({ where: { bookId } });
    await transaction.bookCategory.createMany({
      data: categoryIds.map(categoryId => ({ categoryId, bookId })),
    });
  }

  private async updateBookAuthors(
    authorIds: number[],
    bookId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    await transaction.bookAuthor.deleteMany({ where: { bookId } });
    await transaction.bookAuthor.createMany({
      data: authorIds.map(authorId => ({ authorId, bookId })),
    });
  }

  private async updateBookInfo(
    {
      name,
      description,
      previewUrl,
    }: {
      name: string;
      description: string | null | undefined;
      previewUrl: string | null | undefined;
    },
    bookId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    await transaction.book.update({
      where: { id: bookId },
      data: {
        name,
        description,
        previewUrl,
      },
    });
  }
}
