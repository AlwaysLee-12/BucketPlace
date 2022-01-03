import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports: [PrismaModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
