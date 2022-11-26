import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookInventory } from './book-inventory.model';

@ObjectType()
export class CustomerDetailsReservation {
  @Field(type => Int)
  id: number;

  @Field(type => Int, { nullable: true, description: 'milliseconds' })
  createdAt: number | null | undefined;

  @Field(type => Int, { nullable: true, description: 'milliseconds' })
  startAt: number | null | undefined;

  @Field(type => Int, { nullable: true, description: 'milliseconds' })
  endAt: number | null | undefined;

  @Field(type => Int, { nullable: true, description: 'milliseconds' })
  returnedAt: number | null | undefined;

  @Field(type => String, { nullable: true })
  description: string | null;

  @Field(type => BookInventory)
  bookInventory: BookInventory;
}
