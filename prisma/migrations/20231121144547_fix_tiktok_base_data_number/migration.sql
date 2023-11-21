/*
  Warnings:

  - You are about to drop the `TicktokBaseData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TicktokBaseData" DROP CONSTRAINT "TicktokBaseData_politician_id_fkey";

-- DropTable
DROP TABLE "TicktokBaseData";

-- CreateTable
CREATE TABLE "TiktokBaseData" (
    "id" TEXT NOT NULL,
    "fans" DOUBLE PRECISION NOT NULL,
    "videos" DOUBLE PRECISION NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "avatar" TEXT NOT NULL,
    "heart" DOUBLE PRECISION NOT NULL,
    "start_of_period" TIMESTAMP(3) NOT NULL,
    "end_of_period" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TiktokBaseData_id_key" ON "TiktokBaseData"("id");

-- AddForeignKey
ALTER TABLE "TiktokBaseData" ADD CONSTRAINT "TiktokBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
