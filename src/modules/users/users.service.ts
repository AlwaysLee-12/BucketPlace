import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserInput } from './dto/upsert-user.input';

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

  async updateUser(userId: string, data: UpsertUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
