/*
  Warnings:

  - You are about to drop the `YoutubeCommentdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "YoutubeCommentdata" DROP CONSTRAINT "YoutubeCommentdata_politician_id_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeCommentdata" DROP CONSTRAINT "YoutubeCommentdata_video_id_fkey";

-- DropTable
DROP TABLE "YoutubeCommentdata";

-- CreateTable
CREATE TABLE "YoutubeCommentData" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "replyCount" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCommentData_id_key" ON "YoutubeCommentData"("id");

-- AddForeignKey
ALTER TABLE "YoutubeCommentData" ADD CONSTRAINT "YoutubeCommentData_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "YoutubeVideoData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeCommentData" ADD CONSTRAINT "YoutubeCommentData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
