import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostPlaceInput {
  @Field()
  name: string;

  @Field()
  location: string;
}
