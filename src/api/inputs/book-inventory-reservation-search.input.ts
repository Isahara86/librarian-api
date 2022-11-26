import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsInt } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class BookInventoryReservationSearchInput extends PaginationInput {
  @Field(type => Int)
  @IsInt()
  bookId: number;

  @Field(type => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  inventoryId?: number;
}
