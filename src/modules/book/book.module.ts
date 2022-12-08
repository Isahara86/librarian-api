import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryService } from './category.service';
import { AuthorService } from './author.service';
import { BookInventoryReservationService } from './book-inventory-reservation.service';
import { LanguageService } from './language.service';

@Module({
  providers: [
    BookService,
    CategoryService,
    AuthorService,
    BookInventoryReservationService,
    LanguageService,
  ],
  exports: [
    BookService,
    CategoryService,
    AuthorService,
    BookInventoryReservationService,
    LanguageService,
  ],
})
export class BookModule {}
