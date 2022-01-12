import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { RequestContext } from './request-context.service';

//왜 해당 서비스에서 독립적인 인스턴스를 갖는 Transient scope를 사용했는지
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  private isProduction: boolean = process.env.NODE_ENV === 'production';

  constructor(private req: RequestContext, context: string) {
    super(context);
  }

  log(message: unknown, context?: string): void {
    this.isProduction
      ? console.log(this.prodContext(context), message)
      : super.log(message, this.devContext(context));
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.isProduction
      ? console.error(this.prodContext(context), message, '\n', trace)
      : super.error(message, trace, this.devContext(context));
  }
  //수정
  reqContext(): any {
    return this.req.context || '';
    //return this.req.context?.id || '';
  }

  getContext(context?: string): string {
    return context || this.context || '';
  }

  prodContext(context?: string): string {
    // dayjs().format('YYYY-MM-DD HH:mm:ss');
    let prefix = new Date().toLocaleString();

    if (this.reqContext) {
      prefix += ` [${this.reqContext}]`;
    }

    const ctx = this.getContext(context);
    if (ctx) {
      prefix += ` [${ctx}]`;
    }

    return prefix;
  }

  devContext(context?: string): string {
    const prefix = [];

    this.reqContext && prefix.push(this.reqContext);

    const ctx = this.getContext(context);
    ctx && prefix.push(ctx);

    return prefix.join('] [');
  }
}
