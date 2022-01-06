//코드 우선 접근 방식. TypeScript Decorator를 사용해 SDL 생성
//@nestjs/graphql 패키지가 데코레이터를 통해 정의된 메타 데이터를 읽고 자동으로 스키마를 생성함
import { User } from '.prisma/client';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionModel } from '../../collections/models/collection.model';

@ObjectType({ description: 'User model' })
export class UserModel implements User {
  //@Field 데코레이터를 명시함으로써 해당 부분이 필드에 해당하는 것이고, 해당 필드의 타입 및 옵션과 같은 메타 데이터를 인식할 수 있게 함
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  phone_number?: string;

  @Field(() => String, { nullable: true, description: '남 or 여 중 선택' })
  sex?: string;

  @Field(() => CollectionModel, { nullable: true })
  collection?: CollectionModel;
}

//위 ObjectType은
/*
	type User{
		id: Int!
		name: String!
		age: Int
		address: String
		phone_number: String
		sex: String
		collection: Collection
	}
*/
//과 같은 SDL을 생성
