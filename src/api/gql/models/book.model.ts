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
  previewOrig: string | null | undefined;
  @Field(type => String, { nullable: true })
  previewJpeg: string | null | undefined;
  @Field(type => String, { nullable: true })
  previewWebp: string | null | undefined;
  @Field(type => String, { nullable: true })
  previewJpegThumbnail: string | null | undefined;
  @Field(type => String, { nullable: true })
  previewWebpThumbnail: string | null | undefined;

  @Field(type => [Category])
  categories: Category[];

  @Field(type => [Author])
  authors: Author[];

  @Field(type => [Language])
  languages: Language[];

  @Field()
  isAvailable: boolean;
}
