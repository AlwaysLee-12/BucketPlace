import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpsertUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone_number: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sex: string;
}
