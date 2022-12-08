import { Query, Resolver } from '@nestjs/graphql';
import { Language } from './models/language.model';
import { LanguageService } from '../../modules/book/language.service';

@Resolver(of => Language)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Query(returns => [Language])
  async languages(): Promise<Language[]> {
    return this.languageService.findLanguages();
  }
}
