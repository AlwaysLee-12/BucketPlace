import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserInput } from './dto/upsert-user.input';
import { UpdateUserArgs } from './dto/update-user.args';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(data: UpsertUserInput): Promise<User> {
    const user: User = await this.prisma.user.create({
      data,
    });

    await this.prisma.collection.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  async updateUser(args: UpdateUserArgs): Promise<User> {
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
