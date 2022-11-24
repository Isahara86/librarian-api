import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) {}

  findById(id: number): Promise<Customer> {
    return this.db.customer.findFirst({ where: { id } });
  }
}
