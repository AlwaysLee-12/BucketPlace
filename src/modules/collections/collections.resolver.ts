import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { DeletePlaceFromCollectionArgs } from './dto/delete-place-from-collection.args';
import { CollectionPlaceModel } from './models/collection-place.model';
import { CollectionModel } from './models/collection.model';

@Resolver(() => CollectionModel)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionsService) {}

  @Query(() => [CollectionPlaceModel], { name: 'collection' })
  async getCollection(@Args('id', { type: () => String }) id: string) {
    return this.collectionService.getCollection(id);
  }

  // @Mutation(() => Boolean, { name: 'deletePlaceFromCollection' })
  // async deletePlaceFromCollection(@Args() args: DeletePlaceFromCollectionArgs) {
  //   return this.collectionService.deletePlaceFromCollection(args);
  // }
}
