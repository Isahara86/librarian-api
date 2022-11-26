import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { Category } from '@prisma/client';
import { CategoryUpdateInput } from '../../api/models/category-update.input';
import { CategorySearchInput } from '../../api/models/category-search.input';

@Injectable()
export class CategoryService {
  constructor(private readonly db: PrismaService) {}

  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.db.category.create({ data });
  }

  update({ id, name }: CategoryUpdateInput): Promise<Category> {
    return this.db.category.update({ data: { name }, where: { id } });
  }

  async findCategories({ offset, limit, query }: CategorySearchInput): Promise<Category[]> {
    const where: Prisma.CategoryWhereInput = {};
    if (query) {
      where.name = { contains: query, mode: 'insensitive' };
    }

    return this.db.category.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }
}
