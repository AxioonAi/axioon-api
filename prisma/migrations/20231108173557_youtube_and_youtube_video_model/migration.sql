-- CreateTable
CREATE TABLE "YoutubeBaseData" (
    "id" TEXT NOT NULL,
    "channel_name" TEXT NOT NULL,
    "channel_total_videos" INTEGER NOT NULL,
    "channel_total_subs" INTEGER NOT NULL,
    "data_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "YoutubeVideoData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "commentsCount" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeBaseData_id_key" ON "YoutubeBaseData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeVideoData_id_key" ON "YoutubeVideoData"("id");

-- AddForeignKey
ALTER TABLE "YoutubeBaseData" ADD CONSTRAINT "YoutubeBaseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeVideoData" ADD CONSTRAINT "YoutubeVideoData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
