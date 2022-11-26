import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class BookInventoryUpdateInput {
  @Field(type => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  @MinLength(3)
  serialNumber: string;

  @Field()
  @IsString()
  @IsOptional()
  @MinLength(3)
  deleteReason?: string;
}
