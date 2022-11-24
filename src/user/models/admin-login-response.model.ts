import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminLoginResponse {
  @Field()
  name: string;

  @Field()
  token: string;
}
