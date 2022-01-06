import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Collection } from '.prisma/client';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class CollectionModel implements Collection {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  user: UserModel;

  userId: string;
}
