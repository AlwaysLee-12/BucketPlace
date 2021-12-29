import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const prismaService: PrismaService = app.get(PrismaService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log(
    `============================listening on port ${port}=================================`,
  );

  prismaService.enableShutdownHooks(app); //Prisma는 NestJS의 enableShutdownHooks를 방해하기에 종료 신호를 수신하고 어플리케이션 종료 hook이 실행되기 전 process.exit()를 호출해야한다(이 코드는 해당 역할을 수행하는 코드).

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
