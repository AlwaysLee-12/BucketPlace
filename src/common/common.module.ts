import { Global, Module } from '@nestjs/common';
import { Logger } from './providers/logger.service';
import { RequestContext } from './providers/request-context.service';

@Global()
@Module({
  providers: [Logger, RequestContext],
  exports: [Logger, RequestContext],
})
export class CommonModule {}
