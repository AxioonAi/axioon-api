-- CreateTable
CREATE TABLE "TiktokCommentData" (
    "id" TEXT NOT NULL,
    "diggCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "replyCount" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TiktokCommentData_id_key" ON "TiktokCommentData"("id");

-- AddForeignKey
ALTER TABLE "TiktokCommentData" ADD CONSTRAINT "TiktokCommentData_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "TiktokVideoData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokCommentData" ADD CONSTRAINT "TiktokCommentData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
