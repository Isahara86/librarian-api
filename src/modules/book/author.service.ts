import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Author } from '@prisma/client';
import { AuthorSearchInput } from '../../api/inputs/author-search.input';
import { AuthorUpdateInput } from '../../api/inputs/author-update.input';

@Injectable()
export class AuthorService {
  constructor(private readonly db: PrismaService) {}

  create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.db.author.create({ data });
  }

  update({ id, name }: AuthorUpdateInput): Promise<Author> {
    return this.db.customer.update({ data: { name }, where: { id } });
  }

  async findAuthors({ offset, limit, query }: AuthorSearchInput): Promise<Author[]> {
    const where: Prisma.AuthorWhereInput = {};
    if (query) {
      where.name = { contains: query, mode: 'insensitive' };
    }

    return this.db.author.findMany({
      where,
      skip: offset,
      take: limit,
    });
  }
}
