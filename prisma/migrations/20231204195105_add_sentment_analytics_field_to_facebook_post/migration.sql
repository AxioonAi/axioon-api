/*
  Warnings:

  - Added the required column `sentimentAnalysis` to the `FacebookPostComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FacebookPostComments" ADD COLUMN     "sentimentAnalysis" DOUBLE PRECISION NOT NULL;
