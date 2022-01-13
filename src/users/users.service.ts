import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserInput } from './dto/upsert-user.input';
import { UpdateUserArgs } from './dto/update-user.args';
import { Logger } from 'src/common/providers/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async getUser(userId: string): Promise<UserModel | null> {
    this.logger.log('Get User By ID Service');

    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(data: UpsertUserInput): Promise<UserModel> {
    this.logger.log('Create User Service');

    const user: UserModel = await this.prisma.user.create({
      data,
    });

    await this.prisma.collection.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  async updateUser(args: UpdateUserArgs): Promise<UserModel> {
    this.logger.log('Update User Service');

    const { userId, updateUserData } = args;
    const { address, age, name, phone_number, sex } = updateUserData;

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address: address,
        age: age,
        name: name,
        phone_number: phone_number,
        sex: sex,
      },
    });
  }

  async deleteUser(userId: string): Promise<Boolean> {
    this.logger.log('Delete User Service');

    try {
      const collection = await this.prisma.collection.findUnique({
        where: {
          userId: userId,
        },
      });
      const deleteCollectionPlacesQuery =
        this.prisma.collectionPlace.deleteMany({
          where: {
            collectionId: collection.id,
          },
        });
      const deleteCollectionQuery = this.prisma.collection.delete({
        where: {
          userId: userId,
        },
      });
      const deleteUserQuery = this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      await this.prisma.$transaction([
        deleteCollectionPlacesQuery,
        deleteCollectionQuery,
        deleteUserQuery,
      ]);
    } catch (err) {
      //에러 처리 나중에 다시
      console.log(err);
      return false;
    }

    return true;
  }
}
