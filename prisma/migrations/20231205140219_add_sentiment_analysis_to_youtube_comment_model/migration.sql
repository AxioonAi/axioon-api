/*
  Warnings:

  - Added the required column `sentimentAnalysis` to the `YoutubeCommentData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "YoutubeCommentData" ADD COLUMN     "sentimentAnalysis" INTEGER NOT NULL;
