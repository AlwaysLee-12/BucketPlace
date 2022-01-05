import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Place {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  location: string;

  // @Field()
  // image_URL: string;

  @Field(() => User) //[[User]]는 유저 배열
  user?: User;
}
