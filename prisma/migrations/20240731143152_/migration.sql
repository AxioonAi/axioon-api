/*
  Warnings:

  - Added the required column `authorAvatar` to the `TiktokHashtagMention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `TiktokHashtagMention` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TiktokHashtagMention" ADD COLUMN     "authorAvatar" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL;
