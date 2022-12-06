import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../dto/file-upload.interface';

@InputType()
export class BookBaseInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  description: string | null | undefined;

  @Field(() => GraphQLUpload, {
    nullable: true,
    description: 'When not set previous value will be used',
  })
  @IsOptional()
  preview?: Promise<FileUpload>;

  @Field(type => [Int])
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @Field(type => [Int])
  @IsNumber({}, { each: true })
  authorIds: number[];
}
