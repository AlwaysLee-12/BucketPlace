import { Collection, Place } from '.prisma/client';
import { CollectionPlace } from './collection-place.model';

export class GetCollectionResponse extends CollectionPlace {
  collection: Collection;
  place: Place;
}
