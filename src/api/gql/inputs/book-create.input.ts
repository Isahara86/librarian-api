import { InputType, Field } from '@nestjs/graphql';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BookInventoryCreateInput } from './book-inventory-create.input';
import { BookBaseInput } from './book-base.input';

@InputType()
export class BookCreateInput extends BookBaseInput {
  @Field(type => [BookInventoryCreateInput])
  @IsArray()
  @Type(() => BookInventoryCreateInput)
  @ValidateNested({ each: true })
  inventories: BookInventoryCreateInput[];
}
