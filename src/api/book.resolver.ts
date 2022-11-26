import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { BookService } from '../modules/book/book.service';
import { BookSearchInput } from './inputs/book-search.input';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '../modules/auth/gql-admin-auth.guard';
import { BookCreateInput } from './inputs/book-create.input';
import { BookUpdateInput } from './inputs/book-update.input';
import { BookDetails } from './models/book-details.model';

@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(returns => [Book])
  async findBooks(@Args('input') input: BookSearchInput): Promise<Book[]> {
    return this.bookService.findBooks(input);
  }

  @Query(returns => [BookDetails])
  @UseGuards(GqlAdminAuthGuard)
  async bookDetails(@Args('id', { type: () => Int }) id: number): Promise<BookDetails> {
    return this.bookService.getBookDetails(id);
  }

  @Mutation(returns => Book)
  @UseGuards(GqlAdminAuthGuard)
  async createBook(@Args('input') input: BookCreateInput): Promise<Book> {
    return this.bookService.create(input);
  }

  @Mutation(returns => Book)
  @UseGuards(GqlAdminAuthGuard)
  async updateBook(@Args('input') input: BookUpdateInput): Promise<Book> {
    return this.bookService.update(input);
  }
}
