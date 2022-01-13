import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from 'src/common/providers/logger.service';
import { UpdateUserArgs } from './dto/update-user.args';
import { UpsertUserInput } from './dto/upsert-user.input';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(UserResolver.name);
  }

  @Query(() => UserModel, { name: 'user' }) //name: 쿼리 이름, description: 설명, deprecationReason: 쿼리 지원 중단 설정, nullable: 쿼리가 null 데이터 응답을 반환할 수 있는지
  async getUser(@Args('id', { type: () => String }) id: string) {
    this.logger.log('Get User By ID');

    return this.userService.getUser(id);
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  async createUser(@Args('userData') userData: UpsertUserInput) {
    this.logger.log('Create User');

    return this.userService.createUser(userData);
  }

  @Mutation(() => UserModel, { name: 'updateUser' })
  async updateUser(@Args() args: UpdateUserArgs) {
    this.logger.log('Update User');

    return this.userService.updateUser(args);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    this.logger.log('Delete User');

    return this.userService.deleteUser(id);
  }
}
