import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: false, //쿼리문을 던져 응답값을 확인할 수 있는 graphql IDE
      include: [], //inclue 안에 있는 모듈만 스캔(default는 전체 앱에서 스캔)
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //코드 우선 접근 방식(TypeScript 클래스를 이용해 gql 스키마 생성)을 사용하기 위한 속성. 스키마가 생성될 경로
      //스키마를 메모리에서 바로 생성하려면, autoSchemaFile: true로
      sortSchema: true, //스키마 사전순 정렬
      //typePaths: ['./**/*.graphql'], 스키마 우선 접근 방식. TypeScript에만 국한되지 않고, 다른 언어도 포용(SDL 파일을 읽고->TypeScript로 변환?). 스키마 정의 파일(SDL)이 있는 위치
      //definition: {path: join(process.cwd(), 'src/graphql.ts'), outputAs: 'class',} (추후 알아보기). SDL 파일을 TypeScript 파일로 자동으로 매핑해서 생성해주는 옵션(경로는 해당 파일이 저장될 위치)
      //outputAs는 매핑 파일이 클래스로 생성되게 하는 옵션(기본적으로는 interface로 생성됨)
    }),

    //async configuration도 알아보기(forRootAsync)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
