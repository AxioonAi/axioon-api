/*
  Warnings:

  - You are about to drop the column `sentmentAnalysis` on the `NewsUsers` table. All the data in the column will be lost.
  - Added the required column `sentimentAnalysis` to the `NewsUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewsUsers" DROP COLUMN "sentmentAnalysis",
ADD COLUMN     "sentimentAnalysis" INTEGER NOT NULL;
