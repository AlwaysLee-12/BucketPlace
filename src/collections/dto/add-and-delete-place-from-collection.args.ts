import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class AddAndDeletePlaceFromCollectionArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  collectionId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  placeId: string;
}
