import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { middleware } from './app.middleware';
import { AppModule } from './app.module';
import { Logger } from './common/providers/logger.service';
import { PrismaService } from './prisma/prisma.service';

declare const module: any;
// https://github.com/nestjs/nest/issues/2249 폴더 구조 참고
// modules안에 넣지 않는 이유는 interceptors, guards, pipes 등도 모듈로 분류되는데 이 경우 이런 것들이 모듈 modules라는 폴더로 들어가게 되게 때문
// 결국, modules라는 폴더에 예상보다 많은 것들이 들어가 따로 modules라는 폴더명으로 분리한 이유가 없어짐(최악의 경우 모든 것이 modules로 들어갈수도...)
async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const port = process.env.PORT || 3000;
  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app); //Prisma는 NestJS의 enableShutdownHooks를 방해하기에 종료 신호를 수신하고 어플리케이션 종료 hook이 실행되기 전 process.exit()를 호출해야한다(이 코드는 해당 역할을 수행하는 코드).

  //app.useLogger(await app.resolve(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (isProduction) {
    app.enable('trust proxy');
  }

  //express middleware
  //middleware(app);

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app.getUrl();
}
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
