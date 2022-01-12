import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UpdateUserArgs } from './dto/update-user.args';
import { UpsertUserInput } from './dto/upsert-user.input';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => UserModel, { name: 'user' }) //name: 쿼리 이름, description: 설명, deprecationReason: 쿼리 지원 중단 설정, nullable: 쿼리가 null 데이터 응답을 반환할 수 있는지
  async getUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.getUser(id);
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  async createUser(@Args('userData') userData: UpsertUserInput) {
    console.log(userData);
    return this.userService.createUser(userData);
  }

  @Mutation(() => UserModel, { name: 'updateUser' })
  async updateUser(@Args() args: UpdateUserArgs) {
    return this.userService.updateUser(args);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.deleteUser(id);
  }
}
