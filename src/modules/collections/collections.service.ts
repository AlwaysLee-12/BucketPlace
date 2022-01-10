import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionPlaceModel } from './models/collection-place.model';
import { DeletePlaceFromCollectionArgs } from './dto/delete-place-from-collection.args';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollection(collectionId: string): Promise<CollectionPlaceModel[]> {
    return await this.prisma.collectionPlace.findMany({
      where: {
        collectionId: collectionId,
      },
      include: {
        place: true,
        collection: true,
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
