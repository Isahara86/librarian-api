import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CustomerCreateInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
