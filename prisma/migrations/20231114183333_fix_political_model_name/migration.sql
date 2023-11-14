/*
  Warnings:

  - You are about to drop the `PolicalGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PoliticianProfile" DROP CONSTRAINT "PoliticianProfile_political_group_id_fkey";

-- DropTable
DROP TABLE "PolicalGroup";

-- CreateTable
CREATE TABLE "PoliticalGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "instagram" TEXT,
    "ticktok" TEXT,
    "youtube" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "president" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PoliticalGroup_id_key" ON "PoliticalGroup"("id");

-- AddForeignKey
ALTER TABLE "PoliticianProfile" ADD CONSTRAINT "PoliticianProfile_political_group_id_fkey" FOREIGN KEY ("political_group_id") REFERENCES "PoliticalGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
