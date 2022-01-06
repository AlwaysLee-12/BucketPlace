import { Injectable } from '@nestjs/common';
import { CollectionPlace } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DeletePlaceFromCollectionArgs } from './dto/delete-place-from-collection.args';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollection(collectionId: string): Promise<CollectionPlace[]> {
    return await this.prisma.collectionPlace.findMany({
      where: {
        collectionId: collectionId,
      },
    });
  }

  // async deletePlaceFromCollection(
  //   args: DeletePlaceFromCollectionArgs,
  // ): Promise<boolean> {
  //   const { collectionId, placeId } = args;
  //   try {
  //     await this.prisma.collectionPlace.delete({
  //       where: {
  //         collectionId: collectionId,
  //         placeId: placeId,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  //   return true;
  // }
}
