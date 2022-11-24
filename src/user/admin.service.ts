import { Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly db: PrismaService) {}

  findById(id: number): Promise<Admin> {
    return this.db.admin.findFirst({ where: { id } });
  }
}
