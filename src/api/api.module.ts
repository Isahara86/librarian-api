import { Module } from '@nestjs/common';
import { AppController } from './http/app.controller';
import { AuthorResolver } from './gql/author.resolver';
import { CategoryResolver } from './gql/category.resolver';
import { BookResolver } from './gql/book.resolver';
import { CustomerResolver } from './gql/customer.resolver';
import { AdminResolver } from './gql/admin.resolver';
import { BookInventoryReservationResolver } from './gql/book-inventory-reservation.resolver';
import { FileController } from './http/file.controller';
import { LanguageResolver } from './gql/language.resolver';

@Module({
  controllers: [AppController, FileController],
  providers: [
    AuthorResolver,
    CategoryResolver,
    BookResolver,
    CustomerResolver,
    AdminResolver,
    BookInventoryReservationResolver,
    LanguageResolver,
  ],
})
export class ApiModule {}
