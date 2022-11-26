import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class BookBaseInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(type => String,{ nullable: true })
  @IsOptional()
  @MinLength(3)
  description: string | null | undefined;

  @Field(type => String,{ nullable: true })
  @IsString()
  @IsOptional()
  previewUrl: string | null | undefined;

  @Field(type => [Int])
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @Field(type => [Int])
  @IsNumber({}, { each: true })
  authorIds: number[];
}
