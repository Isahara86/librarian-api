import { Field, InputType, } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class BookInventoryCreateInput {
  @Field()
  @IsString()
  @MinLength(3)
  serialNumber: string;
}
