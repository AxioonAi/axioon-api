/*
  Warnings:

  - You are about to drop the column `query` on the `InstagramPost` table. All the data in the column will be lost.
  - Added the required column `playCount` to the `InstagramPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramPost" DROP COLUMN "query",
ADD COLUMN     "playCount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "InstagramPostComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "ownerProfilePicUrl" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "likeCount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPostComment_id_key" ON "InstagramPostComment"("id");
