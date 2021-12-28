import {
  Query,
  Args,
  Int,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Place } from 'src/models/place.model';
import { PlacesService } from './places.service';

@Resolver((of) => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlacesService) {}

  @Query((returns) => Place, { name: 'place' })
  async getPlace(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOneById(id);
  }
}
