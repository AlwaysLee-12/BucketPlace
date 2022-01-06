import { Injectable } from '@nestjs/common';
import { Collection, CollectionPlace, Prisma } from '@prisma/client';
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

  async deleteCollection(userId: string): Promise<any> {
    const collection: Collection = await this.prisma.collection.findUnique({
      where: {
        userId: userId,
      },
    });
    const deleteCollectionPlaces = this.prisma.collectionPlace.deleteMany({
      where: {
        collectionId: collection.id,
      },
    });
    const deleteCollection = this.prisma.collection.delete({
      where: {
        userId: userId,
      },
    });

    return await this.prisma.$transaction([
      deleteCollectionPlaces,
      deleteCollection,
    ]);
  }
}
