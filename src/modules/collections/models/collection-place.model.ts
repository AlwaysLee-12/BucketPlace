import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionModel } from './collection.model';
import { PlaceModel } from '../../places/models/place.model';

import { CollectionPlace } from '.prisma/client';

@ObjectType()
export class CollectionPlaceModel implements CollectionPlace {
  @Field((type) => ID)
  id: string;

  @Field((type) => CollectionModel)
  collection: CollectionModel;

  @Field((type) => PlaceModel)
  place: PlaceModel;

  collectionId: string;
  placeId: string;
}
