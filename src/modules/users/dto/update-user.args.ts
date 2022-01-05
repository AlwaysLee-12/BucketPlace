import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpsertUserInput } from './upsert-user.input';

@ArgsType()
export class UpdateUserArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  updateUserData: UpsertUserInput;
}
