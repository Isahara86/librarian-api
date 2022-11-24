import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly db: PrismaService) {}

  async findById(id: number): Promise<Admin> {
    return this.db.admin.findFirst({ where: { id } });
  }

  async findByLogin(login: string): Promise<Admin> {
    return this.db.admin.findFirst({ where: { login } });
  }

  async create(dto: Prisma.AdminCreateInput): Promise<void> {
    await this.db.admin.create({ data: dto });
  }
}
