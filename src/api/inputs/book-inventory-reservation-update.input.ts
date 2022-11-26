import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';
import { BookInventoryReservationCreateInput } from './book-inventory-reservation-create.input';

@InputType()
export class BookInventoryReservationUpdateInput extends BookInventoryReservationCreateInput {
  @Field(type => Int)
  @IsInt()
  id: number;

  @Field(type => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  @Min(1000000000000)
  returnedAt?: number;
}
