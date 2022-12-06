import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './book.model';

@ObjectType()
export class BookInventory {
  @Field(type => Int)
  id: number;

  @Field()
  serialNumber: string;

  @Field(type => String, { nullable: true })
  deleteReason: string | null;

  @Field(type => Book)
  book: Book;
}
