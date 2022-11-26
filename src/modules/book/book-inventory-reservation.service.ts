import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { BookInventoryReservationSearchInput } from '../../api/inputs/book-inventory-reservation-search.input';
import { BookInventoryReservationCreateInput } from '../../api/inputs/book-inventory-reservation-create.input';
import { BookInventoryReservationUpdateInput } from '../../api/inputs/book-inventory-reservation-update.input';
import { BookInventoryReservation } from '../../api/models/book-inventory-reservation.model';
import { CustomerDetailsReservation } from '../../api/models/customer-details-reservation.model';
import { CustomerReservationsSearchInput } from '../../api/inputs/customer-reservations-search.input';

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
      createdAt: h.createdAt?.getTime(),
      startAt: h.startAt?.getTime(),
      endAt: h.endAt?.getTime(),
      returnedAt: h.returnedAt?.getTime(),
      description: h.description,
      bookInventory: {
        id: h.bookInventory.id,
        serialNumber: h.bookInventory.serialNumber,
        deleteReason: h.bookInventory.deleteReason,
        book: {
          id: h.bookInventory.book.id,
          name: h.bookInventory.book.name,
          description: h.bookInventory.book.description,
          previewUrl: h.bookInventory.book.previewUrl,
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
      createdAt: res.createdAt?.getTime(),
      startAt: res.startAt?.getTime(),
      endAt: res.endAt?.getTime(),
      returnedAt: res.returnedAt?.getTime(),
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
      createdAt: reservation.createdAt?.getTime(),
      startAt: reservation.startAt?.getTime(),
      endAt: reservation.endAt?.getTime(),
      returnedAt: reservation.returnedAt?.getTime(),
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
      createdAt: reservation.createdAt?.getTime(),
      startAt: reservation.startAt?.getTime(),
      endAt: reservation.endAt?.getTime(),
      returnedAt: reservation.returnedAt?.getTime(),
      description: reservation.description,
      customer: reservation.customer,
    };
  }
}
