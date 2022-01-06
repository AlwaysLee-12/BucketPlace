import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostPlaceArgs } from './dto/post-place.args';
import { PostPlaceInput } from './dto/post-place.input';
import { Place } from './models/place.model';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlace(placeId: string): Promise<Place | null> {
    return this.prisma.place.findUnique({
      where: { id: placeId },
      include: {
        user: true,
      },
    });
  }

  async postPlace(args: PostPlaceArgs): Promise<Place> {
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
