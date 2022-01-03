import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { CollectionsController } from './collections.controller';
import { CollectionResolver } from './collections.resolver';
import { CollectionsService } from './collections.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionResolver],
})
export class CollectionsModule {}
