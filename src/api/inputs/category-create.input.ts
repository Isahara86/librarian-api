import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CategoryCreateInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;
}
