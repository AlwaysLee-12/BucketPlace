-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_placeId_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CollectionPlace" ALTER COLUMN "collectionId" DROP NOT NULL,
ALTER COLUMN "placeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
