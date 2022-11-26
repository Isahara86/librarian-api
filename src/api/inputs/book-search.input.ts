import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class BookSearchInput extends PaginationInput {
  @Field({ nullable: true, description: 'search by name, description' })
  @IsString()
  @IsOptional()
  query?: string;

  @Field(type => [String])
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];

  @Field(type => [String])
  @IsNumber({}, { each: true })
  @IsOptional()
  authorIds?: number[];
}
