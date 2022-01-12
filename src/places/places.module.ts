import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlaceResolver } from './places.resolver';
import { PlacesService } from './places.service';

@Module({
  imports: [PrismaModule],
  providers: [PlacesService, PlaceResolver],
})
export class PlacesModule {}
