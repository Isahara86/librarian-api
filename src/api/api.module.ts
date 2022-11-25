import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthorResolver } from './author.resolver';
import { CategoryResolver } from './category.resolver';
import { BookResolver } from './book.resolver';
import { CustomerResolver } from './customer.resolver';
import { AdminResolver } from './admin.resolver';

@Module({
  controllers: [AppController],
  providers: [AuthorResolver, CategoryResolver, BookResolver, CustomerResolver, AdminResolver],
})
export class ApiModule {}
