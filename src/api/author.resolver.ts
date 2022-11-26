import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { Author } from './models/author.model';
import { AuthorService } from '../modules/book/author.service';
import { AuthorSearchInput } from './models/author-search.input';
import { AuthorCreateInput } from './models/author-create.input';
import { AuthorUpdateInput } from './models/author-update.input';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}
  @Query(returns => [Author])
  async authors(
    @Args('input')
    input: AuthorSearchInput,
  ): Promise<Author[]> {
    return this.authorService.findAuthors(input);
  }

  @Mutation(returns => Author)
  @UseGuards(GqlAdminAuthGuard)
  createAuthor(
    @Args('input')
    input: AuthorCreateInput,
  ): Promise<Author> {
    return this.authorService.create(input);
  }

  @Mutation(returns => Author)
  @UseGuards(GqlAdminAuthGuard)
  updateAuthor(
    @Args('input')
    input: AuthorUpdateInput,
  ): Promise<Author> {
    return this.authorService.update(input);
  }
}
