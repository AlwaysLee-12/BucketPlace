import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostPlaceInput } from './post-place.input';

@ArgsType()
export class PostPlaceArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  postData: PostPlaceInput;
}
