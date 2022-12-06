import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { BookBaseInput } from './book-base.input';
import { BookInventoryCreateInput } from './book-inventory-create.input';
import { Type } from 'class-transformer';
import { BookInventoryUpdateInput } from './book-inventory-update.input';

@InputType()
export class BookUpdateInput extends BookBaseInput {
  @Field(type => Int)
  @IsInt()
  id: number;

  @Field(type => [BookInventoryUpdateInput])
  @IsArray()
  @Type(() => BookInventoryUpdateInput)
  @ValidateNested({ each: true })
  updatedInventories: BookInventoryUpdateInput[];

  @Field(type => [BookInventoryCreateInput])
  @IsArray()
  @Type(() => BookInventoryCreateInput)
  @ValidateNested({ each: true })
  newInventories: BookInventoryCreateInput[];
}
