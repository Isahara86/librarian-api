import { Field, ObjectType } from '@nestjs/graphql';
import { BookInventoryDetails } from './book-inventory-details.model';
import { Book } from './book.model';

@ObjectType()
export class BookDetails extends Book {
  @Field(type => [BookInventoryDetails])
  inventories: BookInventoryDetails[];

}
