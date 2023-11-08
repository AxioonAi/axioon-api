/*
  Warnings:

  - You are about to drop the column `data_date` on the `YoutubeBaseData` table. All the data in the column will be lost.
  - Added the required column `date` to the `YoutubeBaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeBaseData" DROP COLUMN "data_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
