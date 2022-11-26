import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookInventoryReservation } from './book-inventory-reservation.model';

@ObjectType()
export class BookInventoryDetails {
  @Field(type => Int)
  id: number;

  @Field()
  serialNumber: string;

  @Field(type => String, { nullable: true })
  deleteReason: string | null;

  @Field(type => BookInventoryReservation, { nullable: true })
  activeReservation: BookInventoryReservation | null;
}
