import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Collection } from 'src/models/collection.model';
import { CollectionsService } from './collections.service';

@Resolver((of) => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionsService) {}

  @Query((returns) => Collection, { name: 'collection' })
  async getCollection(@Args('id', { type: () => Int }) id: number) {
    return this.collectionService.findOneById(id);
  }
}
