import { Global, Module } from '@nestjs/common';
import { Logger } from './providers/logger.service';
import { RequestContext } from './providers/request-context.service';
import * as providers from './providers';

@Global()
@Module({
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class CommonModule {}
