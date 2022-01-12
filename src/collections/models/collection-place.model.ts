import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CollectionModel } from './collection.model';
import { PlaceModel } from '../../places/models/place.model';

import { Collection, CollectionPlace, Place } from '.prisma/client';

@ObjectType()
export class CollectionPlaceModel implements CollectionPlace {
  @Field(() => ID)
  id: string;

  @Field(() => CollectionModel)
  collection: Collection;

  @Field(() => PlaceModel)
  place: Place;

  collectionId: string;
  placeId: string;
}
