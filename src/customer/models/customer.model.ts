import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'customer ' })
export class Customer {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ description: 'Customer nick name' })
  name: string;
}
