import {
  Query,
  Args,
  Int,
  Resolver,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { PlaceModel } from 'src/modules/places/models/place.model';
import { GetPlacesArgs } from './dto/get-places.args';
import { PostPlaceArgs } from './dto/post-place.args';
import { PlacesService } from './places.service';

@Resolver(() => PlaceModel)
export class PlaceResolver {
  constructor(private readonly placeService: PlacesService) {}

  @Query(() => PlaceModel, { name: 'place' })
  async getPlace(@Args('id', { type: () => String }) id: string) {
    return this.placeService.getPlace(id);
  }

  @Query(() => [PlaceModel], { name: 'places' })
  async getPlaces(@Args() args: GetPlacesArgs) {
    return this.placeService.getPlaces(args);
  }

  @Mutation(() => PlaceModel, { name: 'postPlace' })
  async postPlace(@Args() args: PostPlaceArgs) {
    return this.placeService.postPlace(args);
  }

  @Mutation(() => Boolean, { name: 'deletePlace' })
  async deletePlace(@Args('id') id: string) {
    return this.placeService.deletePlace(id);
  }
}
