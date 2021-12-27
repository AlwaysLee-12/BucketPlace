// 어플리케이션이 시작될 때마다 SDL 파일->TypeScript 파일을 동적으로 매핑하는 작업이 이루어지는 것이 아닌
// 필요시에 스크립트를 이용해 해당 작업을 진행시키는 방법(필요할때만 호출)
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  //watch: true
  //emitTypenameField: true 모든 객체에 대해 __typename 필드를 자동으로 생성
  //skipResolverArgs: true 인수가 없는 일반 필드로 리졸브 생성
});

//ts-node generate-typings로 스크립트 실행
