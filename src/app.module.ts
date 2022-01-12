import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CollectionsModule } from './collections/collections.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env', //기본적으로 configmodule은 루트 디렉터리에서 .env 파일을 찾지만, 찾을 다른 경로를 지정하고 싶으면 이 옵션을 사용하면 됨
      //여러 경로를 지정할 때는 ['',''] 이런식으로 하면됨. 지정된 파일이 여러개 발견되면, 첫 번째 파일 우선
      cache: true, //process.env에 대한 엑세스 속도가 느릴 수 있기 때문에 cache 속성을 설정해 성능을 높임
      load: [configuration],
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      }, //쿼리문을 던져 응답값을 확인할 수 있는 graphql IDE
      //include: [], //inclue 안에 있는 모듈만 스캔(default는 전체 앱에서 스캔)
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //코드 우선 접근 방식(TypeScript 클래스를 이용해 gql 스키마 생성)을 사용하기 위한 속성. 스키마가 생성될 경로
      //스키마를 메모리에서 바로 생성하려면, autoSchemaFile: true로
      autoTransformHttpErrors: true,
      // cors: { credentials: true },
      sortSchema: true, //스키마 사전순 정렬
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      // installSubscriptionHandlers: true, //스키마 사전순 정렬
      //typePaths: ['./**/*.graphql'], 스키마 우선 접근 방식. TypeScript에만 국한되지 않고, 다른 언어도 포용(SDL 파일을 읽고->TypeScript로 변환?). 스키마 정의 파일(SDL)이 있는 위치
      //definition: {path: join(process.cwd(), 'src/graphql.ts'), outputAs: 'class',} (추후 알아보기). SDL 파일을 TypeScript 파일로 자동으로 매핑해서 생성해주는 옵션(경로는 해당 파일이 저장될 위치)
      //outputAs는 매핑 파일이 클래스로 생성되게 하는 옵션(기본적으로는 interface로 생성됨)
    }),
    UsersModule,
    CollectionsModule,
    PlacesModule,
    //async configuration도 알아보기(forRootAsync)
  ],
})
export class AppModule {}
