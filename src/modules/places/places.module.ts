import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PlacesController } from './places.controller';
import { PlaceResolver } from './places.resolver';
import { PlacesService } from './places.service';

@Module({
  imports: [PrismaModule],
  controllers: [PlacesController],
  providers: [PlacesService, PlaceResolver],
})
export class PlacesModule {}
