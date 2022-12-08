import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(type => String)
  code: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  nativeName: string;
}
