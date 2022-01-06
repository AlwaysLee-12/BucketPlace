/*
  Warnings:

  - Made the column `userId` on table `Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collectionId` on table `CollectionPlace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placeId` on table `CollectionPlace` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_placeId_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "CollectionPlace" ALTER COLUMN "collectionId" SET NOT NULL,
ALTER COLUMN "placeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
