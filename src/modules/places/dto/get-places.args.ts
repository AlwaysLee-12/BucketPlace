import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class GetPlacesArgs {
  @Field()
  @IsInt()
  @IsOptional()
  skip?: number;

  @Field()
  @IsInt()
  @IsOptional()
  take?: number;
}
