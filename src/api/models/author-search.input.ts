import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class AuthorSearchInput extends PaginationInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  query?: string;
}
