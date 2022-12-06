import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { BookInventory } from './book-inventory.model';

@ObjectType()
export class CustomerDetailsReservation {
  @Field(type => Int)
  id: number;

  @Field(type => GraphQLTimestamp, { nullable: true, description: 'milliseconds' })
  createdAt: Date;

  @Field(type => GraphQLTimestamp, { nullable: true, description: 'milliseconds' })
  startAt: Date;

  @Field(type => GraphQLTimestamp, { nullable: true, description: 'milliseconds' })
  endAt: Date;

  @Field(type => GraphQLTimestamp, { nullable: true, description: 'milliseconds' })
  returnedAt: Date | null;

  @Field(type => String, { nullable: true })
  description: string | null;

  @Field(type => BookInventory)
  bookInventory: BookInventory;
}
