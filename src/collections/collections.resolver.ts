import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { AddAndDeletePlaceFromCollectionArgs } from './dto/add-and-delete-place-from-collection.args';
import { GetCollectionArgs } from './dto/get-collection.args';
import { CollectionPlaceModel } from './models/collection-place.model';
import { CollectionModel } from './models/collection.model';

@Resolver(() => CollectionModel)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionsService) {}

  @Query(() => [CollectionPlaceModel], { name: 'collection' })
  async getCollection(@Args() args: GetCollectionArgs) {
    return this.collectionService.getCollection(args);
  }

  @Mutation(() => CollectionPlaceModel, { name: 'addPlaceToCollection' })
  async addPlaceToCollection(
    @Args() args: AddAndDeletePlaceFromCollectionArgs,
  ) {
    return this.collectionService.addPlaceToCollection(args);
  }

  @Mutation(() => Boolean, { name: 'deletePlaceFromCollection' })
  async deletePlaceFromCollection(
    @Args() args: AddAndDeletePlaceFromCollectionArgs,
  ) {
    return this.collectionService.deletePlaceFromCollection(args);
  }
}
