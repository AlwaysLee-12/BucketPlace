import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from 'src/common/providers/logger.service';
import { CollectionsService } from './collections.service';
import { AddAndDeletePlaceFromCollectionArgs } from './dto/add-and-delete-place-from-collection.args';
import { GetCollectionArgs } from './dto/get-collection.args';
import { CollectionPlaceModel } from './models/collection-place.model';
import { CollectionModel } from './models/collection.model';

@Resolver(() => CollectionModel)
export class CollectionResolver {
  constructor(
    private readonly collectionService: CollectionsService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(CollectionResolver.name);
  }

  @Query(() => [CollectionPlaceModel], { name: 'collection' })
  async getCollection(@Args() args: GetCollectionArgs) {
    this.logger.log('Get Collection Datas');
    return this.collectionService.getCollection(args);
  }

  @Mutation(() => CollectionPlaceModel, { name: 'addPlaceToCollection' })
  async addPlaceToCollection(
    @Args() args: AddAndDeletePlaceFromCollectionArgs,
  ) {
    this.logger.log('Add Place To Collection');
    return this.collectionService.addPlaceToCollection(args);
  }

  @Mutation(() => Boolean, { name: 'deletePlaceFromCollection' })
  async deletePlaceFromCollection(
    @Args() args: AddAndDeletePlaceFromCollectionArgs,
  ) {
    this.logger.log('Delete Place From Collection');
    return this.collectionService.deletePlaceFromCollection(args);
  }
}
