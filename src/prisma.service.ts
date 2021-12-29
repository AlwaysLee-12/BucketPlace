// Prisma Client: DB로 쿼리를 보낼 수 있음(js,ts 코드로 DB CRUD를 할 수 있는 쿼리 빌더. typeorm에서의 repository.findOne()같은 느낌?)
import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}