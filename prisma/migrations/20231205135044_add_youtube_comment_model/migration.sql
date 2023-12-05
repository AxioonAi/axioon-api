-- CreateTable
CREATE TABLE "YoutubeCommentdata" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "replyCount" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCommentdata_id_key" ON "YoutubeCommentdata"("id");

-- AddForeignKey
ALTER TABLE "YoutubeCommentdata" ADD CONSTRAINT "YoutubeCommentdata_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "YoutubeVideoData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeCommentdata" ADD CONSTRAINT "YoutubeCommentdata_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
