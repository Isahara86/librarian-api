import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.model';
import { Author } from './author.model';
import { Language } from './language.model';

@ObjectType()
export class Book {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => String, { nullable: true })
  description: string | null | undefined;

  @Field(type => String, { nullable: true })
  previewUrl: string | null | undefined;

  @Field(type => [Category])
  categories: Category[];

  @Field(type => [Author])
  authors: Author[];

  @Field(type => [Language])
  languages: Language[];

  @Field()
  isAvailable: boolean;
}
