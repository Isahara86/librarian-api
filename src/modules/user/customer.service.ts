import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { Customer } from '@prisma/client';
import { CustomerUpdateInput } from '../../api/models/customer-update.input';
import { CustomersSearchInput } from '../../api/models/customers-search.input';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) {}

  findById(id: number): Promise<Customer> {
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
