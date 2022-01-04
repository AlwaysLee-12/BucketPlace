import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { CollectionResolver } from './collections.resolver';
import { CollectionsService } from './collections.service';

@Module({
  imports: [PrismaModule],
  providers: [CollectionsService, CollectionResolver],
})
export class CollectionsModule {}
