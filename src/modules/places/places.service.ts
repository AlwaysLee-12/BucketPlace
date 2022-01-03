import { Injectable } from '@nestjs/common';
import { Place, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlace(
    placeWhereUniqueInput: Prisma.PlaceWhereUniqueInput,
  ): Promise<Place | null> {
    return await this.prisma.place.findUnique({
      where: placeWhereUniqueInput,
    });
  }
}
