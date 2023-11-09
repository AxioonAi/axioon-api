-- CreateTable
CREATE TABLE "InstagramMention" (
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
    "user_id" TEXT NOT NULL,
    "ownerFullName" TEXT NOT NULL,
    "ownerusername" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramMentionComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "ownerProfilePicUrl" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "post_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramMention_id_key" ON "InstagramMention"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramMentionComment_id_key" ON "InstagramMentionComment"("id");

-- AddForeignKey
ALTER TABLE "InstagramMention" ADD CONSTRAINT "InstagramMention_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramMentionComment" ADD CONSTRAINT "InstagramMentionComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "InstagramMention"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
