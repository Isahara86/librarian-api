import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;
}
