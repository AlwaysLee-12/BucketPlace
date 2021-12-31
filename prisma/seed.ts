import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const kim = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'kim',
      age: 20,
      address: 'Seoul',
      phone_number: '010-1234-5678',
      sex: 'man',
    },
  });

  const lee = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'lee',
      age: 21,
      address: 'Busan',
      phone_number: '010-1425-3669',
      sex: 'woman',
    },
  });

  const park = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'park',
      age: 23,
      address: 'Incheon',
      phone_number: '010-7485-8596',
      sex: 'man',
    },
  });

  const choi = await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'choi',
      age: 23,
      address: 'Daejeon',
      phone_number: '010-4156-8974',
      sex: 'woman',
    },
  });

  const kimCollection = await prisma.collection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
    },
  });

  const leeCollection = await prisma.collection.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 2,
    },
  });

  const parkCollection = await prisma.collection.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: 3,
    },
  });

  const choiCollection = await prisma.collection.upsert({
    where: { id: 4 },
    update: {},
    create: {
      userId: 4,
    },
  });

  const kimPostPlace = await prisma.place.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: '애버랜드',
      location: '경기 용인시 처인구 포곡읍 애버랜드로 199',
      userId: 1,
    },
  });

  const leePostPlace = await prisma.place.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: '롯데월드',
      location: '서울 송파구 올림픽로 240',
      userId: 2,
    },
  });

  const parkPostPlace = await prisma.place.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: '영일분식',
      location: '서울 영등포구 도림로141가길 34-1',
      userId: 3,
    },
  });

  const choiPostPlace = await prisma.place.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: '시간을 들이다',
      location: '서울 영등포구 선유서로24길 6 영등포 중흥S-CLASS 1층 115호',
      userId: 4,
    },
  });

  const kimCollectionPlace = await prisma.collectionPlace.upsert({
    where: { id: 1 },
    update: {},
    create: {
      collectionId: 1,
      placeId: 1,
    },
  });

  const leeCollectionPlace = await prisma.collectionPlace.upsert({
    where: { id: 2 },
    update: {},
    create: {
      collectionId: 2,
      placeId: 2,
    },
  });

  const parkCollectionPlace = await prisma.collectionPlace.upsert({
    where: { id: 3 },
    update: {},
    create: {
      collectionId: 3,
      placeId: 3,
    },
  });

  const choiCollectionPlace = await prisma.collectionPlace.upsert({
    where: { id: 4 },
    update: {},
    create: {
      collectionId: 4,
      placeId: 4,
    },
  });

  console.log(await prisma.user.findMany());
  console.log(await prisma.collection.findMany());
  console.log(
    await prisma.place.findFirst({
      select: { user: true },
      where: { userId: 1 },
    }),
  );
  console.log(await prisma.collectionPlace.findMany());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
