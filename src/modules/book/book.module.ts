import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryService } from './category.service';
import { AuthorService } from './author.service';

@Module({
  providers: [BookService, CategoryService, AuthorService],
  exports: [BookService, CategoryService, AuthorService],
})
export class BookModule {}
