import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CustomerCreateInput } from './customer-create.input';

@InputType()
export class CustomerUpdateInput extends CustomerCreateInput {
  @Field(type => Int)
  @IsInt()
  id: number;
}
