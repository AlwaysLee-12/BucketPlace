import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Place } from 'src/models/place.model';
import { User } from 'src/models/user.model';
import { PlacesService } from '../places/places.service';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly placeService: PlacesService,
  ) {}

  @Query((returns) => User, { name: 'user' }) //name: 쿼리 이름, description: 설명, deprecationReason: 쿼리 지원 중단 설정, nullable: 쿼리가 null 데이터 응답을 반환할 수 있는지
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUser(id);
  }
}
