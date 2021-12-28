import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Collection } from './collection.model';
import { Place } from './place.model';

@ObjectType()
export class CollectionPlace {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Collection])
  collections: Collection[];

  @Field((type) => [Place])
  places: Place[];
}
