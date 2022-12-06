import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.model';
import { Author } from './author.model';
import { BookInventoryDetails } from './book-inventory-details.model';

@ObjectType()
export class BookDetails {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => String, { nullable: true })
  description: string | null;

  @Field(type => String, { nullable: true })
  previewUrl: string | null;

  @Field(type => [Category])
  categories: Category[];

  @Field(type => [Author])
  authors: Author[];

  @Field(type => [BookInventoryDetails])
  inventories: BookInventoryDetails[];

  @Field()
  isAvailable: boolean;
}
