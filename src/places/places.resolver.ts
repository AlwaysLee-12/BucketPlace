import {
  Query,
  Args,
  Int,
  Resolver,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Logger } from 'src/common/providers/logger.service';
import { GetPlacesArgs } from './dto/get-places.args';
import { PostPlaceArgs } from './dto/post-place.args';
import { PlaceModel } from './models/place.model';
import { PlacesService } from './places.service';

@Resolver(() => PlaceModel)
export class PlaceResolver {
  constructor(
    private readonly placeService: PlacesService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(PlaceResolver.name);
  }

  @Query(() => PlaceModel, { name: 'place' })
  async getPlace(@Args('id', { type: () => String }) id: string) {
    this.logger.log('Get Place By ID');
    return this.placeService.getPlace(id);
  }

  @Query(() => [PlaceModel], { name: 'places' })
  async getPlaces(@Args() args: GetPlacesArgs) {
    this.logger.log('Get All Place');
    return this.placeService.getPlaces(args);
  }

  @Mutation(() => PlaceModel, { name: 'postPlace' })
  async postPlace(@Args() args: PostPlaceArgs) {
    this.logger.log('Post Place');
    return this.placeService.postPlace(args);
  }

  @Mutation(() => Boolean, { name: 'deletePlace' })
  async deletePlace(@Args('id') id: string) {
    this.logger.log('Delete Posted Place');
    return this.placeService.deletePlace(id);
  }
}
