import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'customer ' })
export class Customer {
  @Field(type => Int)
  id: number;

  @Field({ description: 'Customer nick name' })
  name: string;

  @Field(type => String, { nullable: true })
  email: string | null;

  @Field(type => String, { nullable: true })
  phone: string | null;

  @Field(type => String, { nullable: true })
  description: string | null;
}
