import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Collection } from 'src/modules/collections/models/collection.model';
import { CollectionsService } from './collections.service';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionsService) {}

  @Query(() => Collection, { name: 'collection' })
  async getCollection(@Args('id', { type: () => Int }) id: string) {
    return this.collectionService.getCollection({ id });
  }
}
