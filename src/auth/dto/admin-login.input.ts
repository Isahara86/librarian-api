import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AdminLoginInput {
  @Field()
  @IsString()
  login: string;

  @Field()
  @IsString()
  password: string;
}
