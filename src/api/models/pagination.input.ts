import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(type => Int, { defaultValue: 0 })
  @IsInt()
  offset = 0;

  @Field(type => Int, { defaultValue: 10 })
  @IsInt()
  limit = 10;
}
