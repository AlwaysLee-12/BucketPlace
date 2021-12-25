import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      include: [], //inclue 안에 있는 모듈만 스캔(default는 전체 앱에서 스캔)
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //코드 우선 접근 방식(TypeScript 클래스를 이용해 gql 스키마 생성)을 사용하기 위한 속성
      //스키마를 메모리에서 바로 생성하려면, autoSchemaFile: true로
      sortSchema: true, //스키마 사전순 정렬
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
