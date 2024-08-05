/*
  Warnings:

  - Added the required column `updatedAt` to the `InstagramEngager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TiktokEngager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramEngager" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TiktokEngager" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ActiveDebt" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "debtOrigin" TEXT NOT NULL,
    "consolidatedValue" TEXT NOT NULL,
    "responsibleUnity" TEXT NOT NULL,
    "responsibleUnityUF" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "registrationSituationType" TEXT NOT NULL,
    "registrationSituation" TEXT NOT NULL,
    "politicianProfileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveDebt_id_key" ON "ActiveDebt"("id");

-- AddForeignKey
ALTER TABLE "ActiveDebt" ADD CONSTRAINT "ActiveDebt_politicianProfileId_fkey" FOREIGN KEY ("politicianProfileId") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
