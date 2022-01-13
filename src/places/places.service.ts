import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/providers/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { GetPlacesArgs } from './dto/get-places.args';
import { PostPlaceArgs } from './dto/post-place.args';
import { PostPlaceInput } from './dto/post-place.input';
import { PlaceModel } from './models/place.model';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {
    this.logger.setContext(PlacesService.name);
  }

  async getPlace(placeId: string): Promise<PlaceModel | null> {
    this.logger.log('Get Place By ID Service');

    return await this.prisma.place.findUnique({
      where: { id: placeId },
      include: {
        user: true,
      },
    });
  }

  async getPlaces(args: GetPlacesArgs): Promise<PlaceModel[]> {
    this.logger.log('Get All Place Service');

    const { skip, take } = args;

    return await this.prisma.place.findMany({ skip, take });
  }

  async postPlace(args: PostPlaceArgs): Promise<PlaceModel> {
    this.logger.log('Post Place Service');

    const { userId, postData } = args;
    const { name, location } = postData;

    return await this.prisma.place.create({
      data: {
        name: name,
        location: location,
        userId: userId,
      },
    });
  }

  async deletePlace(placeId: string): Promise<boolean> {
    this.logger.log('Delete Place Service');

    try {
      const deleteCollectionPlaceQuery = this.prisma.collectionPlace.deleteMany(
        {
          where: {
            placeId: placeId,
          },
        },
      );
      const deletePlaceQuery = this.prisma.place.delete({
        where: {
          id: placeId,
        },
      });

      await this.prisma.$transaction([
        deleteCollectionPlaceQuery,
        deletePlaceQuery,
      ]);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
