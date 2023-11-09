/*
  Warnings:

  - You are about to drop the column `ownerusername` on the `InstagramMention` table. All the data in the column will be lost.
  - Added the required column `ownerUsername` to the `InstagramMention` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramMention" DROP COLUMN "ownerusername",
ADD COLUMN     "ownerUsername" TEXT NOT NULL;
