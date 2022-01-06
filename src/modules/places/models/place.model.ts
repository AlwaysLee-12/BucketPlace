import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Place } from '.prisma/client';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class PlaceModel implements Place {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  location: string;

  // @Field()
  // image_URL: string;

  @Field(() => UserModel) //[[User]]는 유저 배열
  user?: UserModel;

  userId: string;
}
