import { InputType, Field, Int, GraphQLTimestamp } from '@nestjs/graphql';
import { IsInt, IsDefined, IsString, Min, MinLength } from 'class-validator';

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
  @IsString()
  @MinLength(3)
  description: string | null | undefined;

  @Field(type => GraphQLTimestamp)
  @IsDefined()
  startAt: number;

  @Field(type => GraphQLTimestamp)
  @IsDefined()
  endAt: number;
}
