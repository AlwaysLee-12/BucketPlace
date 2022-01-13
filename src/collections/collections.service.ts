import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionPlaceModel } from './models/collection-place.model';
import { AddAndDeletePlaceFromCollectionArgs } from './dto/add-and-delete-place-from-collection.args';
import { PlaceModel } from '../places/models/place.model';
import { GetCollectionArgs } from './dto/get-collection.args';
import { Logger } from 'src/common/providers/logger.service';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {
    this.logger.setContext(CollectionsService.name);
  }

  async getCollection(
    args: GetCollectionArgs,
  ): Promise<CollectionPlaceModel[]> {
    this.logger.log('Get Collection Datas Service');

    const { collectionId, skip, take } = args;

    return await this.prisma.collectionPlace.findMany({
      where: {
        collectionId: collectionId,
      },
      skip: skip,
      take: take,
      include: {
        place: true,
        collection: true,
      },
    });
  }

  async addPlaceToCollection(
    args: AddAndDeletePlaceFromCollectionArgs,
  ): Promise<CollectionPlaceModel | null> {
    this.logger.log('Add Place To Collection Service');

    const { collectionId, placeId } = args;

    const collectionPlace: CollectionPlaceModel =
      await this.prisma.collectionPlace.findFirst({
        where: {
          collectionId: collectionId,
          placeId: placeId,
        },
        include: {
          collection: true,
          place: true,
        },
      });

    if (collectionPlace) {
      //에러 코드 수정
      throw new NotFoundException('Place Already Exist In Collection');
    } else {
      return await this.prisma.collectionPlace.create({
        data: {
          collectionId: collectionId,
          placeId: placeId,
        },
        include: {
          collection: true,
          place: true,
        },
      });
    }
  }

  async deletePlaceFromCollection(
    args: AddAndDeletePlaceFromCollectionArgs,
  ): Promise<boolean> {
    this.logger.log('Delete Place From Collection Service');

    const { collectionId, placeId } = args;
    const collectionPlace = await this.prisma.collectionPlace.findFirst({
      where: {
        collectionId: collectionId,
        placeId: placeId,
      },
    });

    try {
      await this.prisma.collectionPlace.delete({
        where: {
          id: collectionPlace.id,
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
