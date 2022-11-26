import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { AuthorCreateInput } from './author-create.input';

@InputType()
export class AuthorUpdateInput extends AuthorCreateInput {
  @Field(type => Int)
  @IsInt()
  id: number;
}
