-- CreateTable
CREATE TABLE "CollectionPlace" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "CollectionPlace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPlace" ADD CONSTRAINT "CollectionPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
