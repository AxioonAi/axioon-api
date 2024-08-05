-- CreateTable
CREATE TABLE "TiktokHashtagMention" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "diggCount" INTEGER NOT NULL,
    "shareCount" INTEGER NOT NULL,
    "playCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "tiktokEngagerId" TEXT,
    "hashtagId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TiktokHashtagCommentData" (
    "id" TEXT NOT NULL,
    "diggCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "replyCount" INTEGER NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "authorGender" "SexType" NOT NULL DEFAULT 'MALE',
    "sentimentAnalysis" INTEGER NOT NULL,
    "tiktokEngagerId" TEXT,
    "hashtagId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramHashtagMention" (
    "id" TEXT NOT NULL,
    "postUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "playCount" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "ownerFullName" TEXT NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "sentimentAnalysis" DOUBLE PRECISION NOT NULL,
    "instagramEngagerId" TEXT,
    "hashtagId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramHashtagMentionComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "ownerProfilePicUrl" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "authorGender" "SexType" NOT NULL DEFAULT 'MALE',
    "likeCount" INTEGER NOT NULL,
    "post_id" TEXT NOT NULL,
    "sentimentAnalysis" DOUBLE PRECISION NOT NULL,
    "instagramEngagerId" TEXT,
    "hashtagId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TiktokHashtagMention_id_key" ON "TiktokHashtagMention"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TiktokHashtagCommentData_id_key" ON "TiktokHashtagCommentData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramHashtagMention_id_key" ON "InstagramHashtagMention"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramHashtagMentionComment_id_key" ON "InstagramHashtagMentionComment"("id");

-- AddForeignKey
ALTER TABLE "TiktokHashtagMention" ADD CONSTRAINT "TiktokHashtagMention_tiktokEngagerId_fkey" FOREIGN KEY ("tiktokEngagerId") REFERENCES "TiktokEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokHashtagMention" ADD CONSTRAINT "TiktokHashtagMention_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokHashtagCommentData" ADD CONSTRAINT "TiktokHashtagCommentData_tiktokEngagerId_fkey" FOREIGN KEY ("tiktokEngagerId") REFERENCES "TiktokEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokHashtagCommentData" ADD CONSTRAINT "TiktokHashtagCommentData_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "TiktokHashtagMention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokHashtagCommentData" ADD CONSTRAINT "TiktokHashtagCommentData_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramHashtagMention" ADD CONSTRAINT "InstagramHashtagMention_instagramEngagerId_fkey" FOREIGN KEY ("instagramEngagerId") REFERENCES "InstagramEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramHashtagMention" ADD CONSTRAINT "InstagramHashtagMention_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramHashtagMentionComment" ADD CONSTRAINT "InstagramHashtagMentionComment_instagramEngagerId_fkey" FOREIGN KEY ("instagramEngagerId") REFERENCES "InstagramEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramHashtagMentionComment" ADD CONSTRAINT "InstagramHashtagMentionComment_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramHashtagMentionComment" ADD CONSTRAINT "InstagramHashtagMentionComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "InstagramHashtagMention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
