import { Injectable } from '@nestjs/common';
import { Collection, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollection(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
  ): Promise<Collection | null> {
    return await this.prisma.collection.findUnique({
      where: collectionWhereUniqueInput,
    });
  }
}
