import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { BookInventoryReservationSearchInput } from '../../api/gql/inputs/book-inventory-reservation-search.input';
import { BookInventoryReservationCreateInput } from '../../api/gql/inputs/book-inventory-reservation-create.input';
import { BookInventoryReservationUpdateInput } from '../../api/gql/inputs/book-inventory-reservation-update.input';
import { BookInventoryReservation } from '../../api/gql/models/book-inventory-reservation.model';
import { CustomerDetailsReservation } from '../../api/gql/models/customer-details-reservation.model';
import { CustomerReservationsSearchInput } from '../../api/gql/inputs/customer-reservations-search.input';

@Injectable()
export class BookInventoryReservationService {
  constructor(private readonly db: PrismaService) {}

  async findCustomerReservationHistory({
    customerId,
    offset,
    limit,
  }: CustomerReservationsSearchInput): Promise<CustomerDetailsReservation[]> {
    const history = await this.db.inventoryReservation.findMany({
      include: {
        bookInventory: {
          include: {
            book: {
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
                bookLanguages: {
                  include: {
                    language: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        customerId,
      },
      skip: offset,
      take: limit,
    });

    return history.map(h => ({
      id: h.id,
      createdAt: h.createdAt,
      startAt: h.startAt,
      endAt: h.endAt,
      returnedAt: h.returnedAt,
      description: h.description,
      bookInventory: {
        id: h.bookInventory.id,
        serialNumber: h.bookInventory.serialNumber,
        deleteReason: h.bookInventory.deleteReason,
        book: {
          id: h.bookInventory.book.id,
          name: h.bookInventory.book.name,
          description: h.bookInventory.book.description,
          previewOrig: h.bookInventory.book.previewOrig,
          previewJpeg: h.bookInventory.book.previewJpeg,
          previewWebp: h.bookInventory.book.previewJpeg,
          previewJpegThumbnail: h.bookInventory.book.previewJpegThumbnail,
          previewWebpThumbnail: h.bookInventory.book.previewWebpThumbnail,
          categories: h.bookInventory.book.bookCategories.map(bc => bc.category),
          authors: h.bookInventory.book.bookAuthors.map(bc => bc.author),
          inventories: h.bookInventory.book.inventories.map(
            ({ id, serialNumber, deleteReason, inventoryReservations }) => ({
              id,
              serialNumber,
              deleteReason,
              activeReservation: inventoryReservations[0]
                ? {
                    id: inventoryReservations[0].id,
                    createdAt: inventoryReservations[0].createdAt,
                    startAt: inventoryReservations[0].startAt,
                    endAt: inventoryReservations[0].endAt,
                    returnedAt: inventoryReservations[0].returnedAt,
                    description: inventoryReservations[0].description,
                    customer: inventoryReservations[0].customer,
                  }
                : null,
            }),
          ),
          languages: h.bookInventory.book.bookLanguages.map(bl => bl.language),
          isAvailable: h.bookInventory.book.inventories.some(inv => !inv.deletedAt),
        },
      },
    }));
  }

  async findReservations({
    bookId,
    inventoryId,
  }: BookInventoryReservationSearchInput): Promise<BookInventoryReservation[]> {
    const where: Prisma.InventoryReservationWhereInput = {
      bookInventory: { bookId },
    };
    if (inventoryId) {
      where.bookInventoryId = inventoryId;
    }

    const reservations = await this.db.inventoryReservation.findMany({
      where,
      include: {
        customer: true,
      },
    });

    return reservations.map(res => ({
      id: res.id,
      createdAt: res.createdAt,
      startAt: res.startAt,
      endAt: res.endAt,
      returnedAt: res.returnedAt,
      description: res.description,
      customer: res.customer,
    }));
  }

  async createReservation({
    customerId,
    bookInventoryId,
    description,
    startAt,
    endAt,
  }: BookInventoryReservationCreateInput): Promise<BookInventoryReservation> {
    const activeReserve = await this.db.inventoryReservation.findFirst({
      where: { bookInventoryId, returnedAt: null },
    });

    if (activeReserve) {
      throw new BadRequestException('This book is already reserved');
    }

    const reservation = await this.db.inventoryReservation.create({
      include: {
        customer: true,
      },
      data: {
        customerId,
        bookInventoryId,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      },
    });

    return {
      id: reservation.id,
      createdAt: reservation.createdAt,
      startAt: reservation.startAt,
      endAt: reservation.endAt,
      returnedAt: reservation.returnedAt,
      description: reservation.description,
      customer: reservation.customer,
    };
  }

  async updateReservation({
    id,
    bookInventoryId,
    description,
    startAt,
    endAt,
    returnedAt,
    customerId,
  }: BookInventoryReservationUpdateInput): Promise<BookInventoryReservation> {
    const exsistingReservation = await this.db.inventoryReservation.findFirst({ where: { id } });

    if (!exsistingReservation) {
      throw new BadRequestException('Reservation does not exist');
    }

    const reservation = await this.db.inventoryReservation.update({
      where: { id },
      include: {
        customer: true,
      },
      data: {
        customerId,
        bookInventoryId,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        returnedAt: returnedAt ? new Date(returnedAt) : null,
      },
    });

    return {
      id: reservation.id,
      createdAt: reservation.createdAt,
      startAt: reservation.startAt,
      endAt: reservation.endAt,
      returnedAt: reservation.returnedAt,
      description: reservation.description,
      customer: reservation.customer,
    };
  }
}
