import {
  Query,
  Args,
  Int,
  Resolver,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Place } from 'src/modules/places/models/place.model';
import { PostPlaceArgs } from './dto/post-place.args';
import { PlacesService } from './places.service';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlacesService) {}

  @Query(() => Place, { name: 'place' })
  async getPlace(@Args('id', { type: () => String }) id: string) {
    return this.placeService.getPlace(id);
  }

  @Mutation(() => Place, { name: 'postPlace' })
  async postPlace(@Args() args: PostPlaceArgs) {
    return this.placeService.postPlace(args);
  }

  @Mutation(() => Boolean, { name: 'deletePlace' })
  async deletePlace(@Args('id') id: string) {
    return this.placeService.deletePlace(id);
  }
}
