import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthorResolver } from './author.resolver';
import { CategoryResolver } from './category.resolver';
import { BookResolver } from './book.resolver';
import { CustomerResolver } from './customer.resolver';
import { AdminResolver } from './admin.resolver';
import { BookInventoryReservationResolver } from './book-inventory-reservation.resolver';
import { FileController } from './file.controller';

@Module({
  controllers: [AppController, FileController],
  providers: [
    AuthorResolver,
    CategoryResolver,
    BookResolver,
    CustomerResolver,
    AdminResolver,
    BookInventoryReservationResolver,
  ],
})
export class ApiModule {}
