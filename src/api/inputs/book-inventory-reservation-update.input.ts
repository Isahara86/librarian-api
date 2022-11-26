import { InputType, Field, Int, GraphQLTimestamp } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { BookInventoryReservationCreateInput } from './book-inventory-reservation-create.input';

@InputType()
export class BookInventoryReservationUpdateInput extends BookInventoryReservationCreateInput {
  @Field(type => Int)
  @IsInt()
  id: number;

  @Field(type => GraphQLTimestamp, { nullable: true })
  @IsOptional()
  returnedAt?: number;
}
