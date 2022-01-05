import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Place {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  location: string;

  // @Field()
  // image_URL: string;

  @Field(() => User) //[[User]]는 유저 배열
  user?: User;
}
