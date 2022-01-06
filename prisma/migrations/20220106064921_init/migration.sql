/*
  Warnings:

  - Made the column `collectionId` on table `CollectionPlace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placeId` on table `CollectionPlace` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPlace" DROP CONSTRAINT "CollectionPlace_placeId_fkey";

-- AlterTable
ALTER TABLE "CollectionPlace" ALTER COLUMN "collectionId" SET NOT NULL,
ALTER COLUMN "placeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
