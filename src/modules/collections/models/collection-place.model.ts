import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from './collection.model';
import { Place } from '../../places/models/place.model';

@ObjectType()
export class CollectionPlace {
  @Field((type) => ID)
  id: string;

  @Field((type) => Collection)
  collection: Collection;

  @Field((type) => Place)
  place: Place;
}
