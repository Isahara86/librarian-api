import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CategoryCreateInput } from './category-create.input';

@InputType()
export class CategoryUpdateInput extends CategoryCreateInput {
  @Field(type => Int)
  @IsInt()
  id: number;
}
