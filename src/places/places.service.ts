import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetPlacesArgs } from './dto/get-places.args';
import { PostPlaceArgs } from './dto/post-place.args';
import { PostPlaceInput } from './dto/post-place.input';
import { PlaceModel } from './models/place.model';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlace(placeId: string): Promise<PlaceModel | null> {
    return await this.prisma.place.findUnique({
      where: { id: placeId },
      include: {
        user: true,
      },
    });
  }

  async getPlaces(args: GetPlacesArgs): Promise<PlaceModel[]> {
    const { skip, take } = args;

    return await this.prisma.place.findMany({ skip, take });
  }

  async postPlace(args: PostPlaceArgs): Promise<PlaceModel> {
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
