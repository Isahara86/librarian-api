import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class CustomerReservationsSearchInput extends PaginationInput {
  @Field(type => Int)
  @IsInt()
  customerId: number;
}
