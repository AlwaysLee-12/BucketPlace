import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Collection {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;
}
