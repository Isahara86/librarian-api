import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'customer ' })
export class Admin {
  @Field(type => Int)
  id: number;

  @Field()
  login: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  passwordSalt: string;
}
