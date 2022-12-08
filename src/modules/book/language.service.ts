import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Language } from '../../api/gql/models/language.model';

@Injectable()
export class LanguageService {
  constructor(private readonly db: PrismaService) {}

  async findLanguages(): Promise<Language[]> {
    return this.db.language.findMany();
  }
}
