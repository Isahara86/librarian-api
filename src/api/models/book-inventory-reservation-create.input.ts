import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, MinLength } from 'class-validator';

@InputType()
export class BookInventoryReservationCreateInput {
  @Field(type => Int)
  @IsInt()
  @Min(1)
  customerId: number;

  @Field(type => Int)
  @IsInt()
  @Min(1)
  bookInventoryId: number;

  @Field(type => String)
  @IsInt()
  @MinLength(3)
  description: string | null | undefined;

  @Field(type => Int)
  @IsInt()
  @Min(1000000000000)
  startAt: number;

  @Field(type => Int)
  @IsInt()
  @Min(1000000000000)
  endAt: number;
}
