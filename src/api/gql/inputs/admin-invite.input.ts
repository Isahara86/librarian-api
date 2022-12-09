import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AdminInviteInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  login: string;

  @Field()
  @IsString()
  password: string;
}
