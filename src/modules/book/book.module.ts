import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryService } from './category.service';
import { AuthorService } from './author.service';
import { BookInventoryReservationService } from './book-inventory-reservation.service';

@Module({
  providers: [BookService, CategoryService, AuthorService, BookInventoryReservationService],
  exports: [BookService, CategoryService, AuthorService, BookInventoryReservationService],
})
export class BookModule {}
