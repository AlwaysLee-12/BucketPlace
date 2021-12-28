import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Place {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;

  // @Field()
  // image_URL: string;

  @Field((type) => [User]) //[[User]]는 유저 배열
  users: User[];
}
