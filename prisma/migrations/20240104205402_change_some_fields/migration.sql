/*
  Warnings:

  - You are about to drop the column `score` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `sentmentAnalysis` on the `News` table. All the data in the column will be lost.
  - Added the required column `sentmentAnalysis` to the `NewsUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "score",
DROP COLUMN "sentmentAnalysis";

-- AlterTable
ALTER TABLE "NewsUsers" ADD COLUMN     "sentmentAnalysis" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "NewsScore";
