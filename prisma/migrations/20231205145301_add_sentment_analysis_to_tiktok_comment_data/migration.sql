/*
  Warnings:

  - Added the required column `sentimentAnalysis` to the `TiktokCommentData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TiktokCommentData" ADD COLUMN     "sentimentAnalysis" INTEGER NOT NULL;
