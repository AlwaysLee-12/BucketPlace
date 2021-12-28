import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Collection {
  @Field((type) => Int)
  id: number;

  @Field((type) => User)
  user: User;
}
