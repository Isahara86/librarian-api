import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class AuthorCreateInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;
}
