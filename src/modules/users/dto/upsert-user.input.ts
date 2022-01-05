import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpsertUserInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phone_number: string;

  @Field({ nullable: true })
  sex: string;
}
