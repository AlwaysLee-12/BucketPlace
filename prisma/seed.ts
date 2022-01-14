import {
  Collection,
  CollectionPlace,
  Place,
  Prisma,
  PrismaClient,
  User,
} from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

const userData: Prisma.UserCreateInput[] = Array(10)
  .fill({})
  .map((_: User, index: number) => ({
    id: index.toString(),
    name: `dummy${index}`,
    age: 20,
    address: '서울 특별시',
    phone_number: '010-1234-5689',
  }));

const placeData: Prisma.PlaceCreateInput[] = Array(10)
  .fill({})
  .map((_: Place, index: number) => ({
    id: index.toString(),
    name: `dummyPlace${index}`,
    location: '경기도',
    userId: index.toString(),
  }));

const collectionData = Array(10)
  .fill({})
  .map((_: Collection, index: number) => ({
    id: index.toString(),
    userId: index.toString(),
  }));

const collectionPlaceData = Array(10)
  .fill({})
  .map((_: CollectionPlace, index: number) => ({
    id: index.toString(),
    placeId: index.toString(),
    collectionId: index.toString(),
  }));

async function main() {
  console.log('Seeding.....');
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Duration: ' + e.duration + 'ms');
  });
  await Promise.all(
    userData.map(async (data: Prisma.UserCreateInput) =>
      prisma.user.create({ data: data }),
    ),
  );
  await Promise.all(
    placeData.map(async (data: Prisma.PlaceCreateInput) =>
      prisma.place.create({ data: data }),
    ),
  );
  await Promise.all(
    collectionData.map(async (data) =>
      prisma.collection.create({ data: data }),
    ),
  );
  await Promise.all(
    collectionPlaceData.map(async (data) =>
      prisma.collectionPlace.create({ data: data }),
    ),
  );
  console.log('Seeding Finished.......');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
