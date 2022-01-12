import { ArgsType, Field, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { AddAndDeletePlaceFromCollectionArgs } from './add-and-delete-place-from-collection.args';

@ArgsType()
export class GetCollectionArgs extends PickType(
  AddAndDeletePlaceFromCollectionArgs,
  ['collectionId'],
) {
  @Field()
  @IsInt()
  @IsOptional()
  skip?: number;

  @Field()
  @IsInt()
  @IsOptional()
  take?: number;
}
