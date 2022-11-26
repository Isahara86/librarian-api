import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { Customer } from '@prisma/client';
import { CustomerUpdateInput } from '../../api/inputs/customer-update.input';
import { CustomersSearchInput } from '../../api/inputs/customers-search.input';
import { CustomerDetails } from '../../api/models/customer-details.model';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) {}

  async getCustomerDetails(id: number): Promise<CustomerDetails> {
    const customer = await this.db.customer.findFirst({
      where: { id },
      include: {
        inventoryReservations: {
          where: { returnedAt: null },
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
        },
      },
    });

    if (!customer) {
      throw new BadRequestException('Customer does not exist');
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      description: customer.description,
      activeReservations: customer.inventoryReservations.map(h => ({
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
      })),
    };
  }

  findById(id: number): Promise<Customer | null> {
    return this.db.customer.findFirst({ where: { id } });
  }

  create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.db.customer.create({ data });
  }

  update({ email, id, name }: CustomerUpdateInput): Promise<Customer> {
    return this.db.customer.update({ data: { email, name }, where: { id } });
  }

  async findCustomers({ offset, limit, query }: CustomersSearchInput): Promise<Customer[]> {
    const where: Prisma.CustomerWhereInput = {};
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ];
    }

    return this.db.customer.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }
}
