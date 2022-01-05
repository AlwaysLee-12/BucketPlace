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
}
