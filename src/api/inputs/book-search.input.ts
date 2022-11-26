import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class BookSearchInput extends PaginationInput {
  @Field({ nullable: true, description: 'search by name, description' })
  @IsString()
  @IsOptional()
  query?: string;

  @Field(type => [Int], { nullable: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];

  @Field(type => [Int], { nullable: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  authorIds?: number[];
}
