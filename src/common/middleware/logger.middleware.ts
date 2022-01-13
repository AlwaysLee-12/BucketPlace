// 미들웨어는 요청이 들어오면 가장먼저 실행됨
// 서버에 대한 API 요청에 대한 정보를 기록

import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Logger } from '../providers/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private passUrl: string[] = ['/health', '/graphql'];
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  // https://github.com/nestjs/graphql/issues/923

  constructor(private readonly logger: Logger) {}

  public use(req: Request, res: Response, next: () => void): void {
    if (this.passUrl.includes(req.originalUrl)) {
      return next();
    }

    // graphql이나 health체크 url이 아닐 때
    // req.id = req.header('X-Request-Id') || nanoid();
    // res.setHeader('X-Request-Id', req.id);

    // const user = req.user?.userId || '';
    // this.logger.log(
    //   `${req.method} ${req.originalUrl} - ${req.ip.replace(
    //     '::ffff:',
    //     '',
    //   )} ${user}`,
    // );

    // return next();
  }
}
