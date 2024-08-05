-- AlterTable
ALTER TABLE "FacebookPostComments" ADD COLUMN     "facebookEngagerId" TEXT;

-- AlterTable
ALTER TABLE "InstagramMention" ADD COLUMN     "instagramEngagerId" TEXT;

-- AlterTable
ALTER TABLE "InstagramMentionComment" ADD COLUMN     "instagramEngagerId" TEXT;

-- AlterTable
ALTER TABLE "InstagramPostComment" ADD COLUMN     "instagramEngagerId" TEXT;

-- AlterTable
ALTER TABLE "TiktokCommentData" ADD COLUMN     "tiktokEngagerId" TEXT;

-- CreateTable
CREATE TABLE "InstagramEngager" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FacebookEngager" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TiktokEngager" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fans" INTEGER NOT NULL,
    "heart" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramEngager_id_key" ON "InstagramEngager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookEngager_id_key" ON "FacebookEngager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TiktokEngager_id_key" ON "TiktokEngager"("id");

-- AddForeignKey
ALTER TABLE "FacebookPostComments" ADD CONSTRAINT "FacebookPostComments_facebookEngagerId_fkey" FOREIGN KEY ("facebookEngagerId") REFERENCES "FacebookEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TiktokCommentData" ADD CONSTRAINT "TiktokCommentData_tiktokEngagerId_fkey" FOREIGN KEY ("tiktokEngagerId") REFERENCES "TiktokEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramPostComment" ADD CONSTRAINT "InstagramPostComment_instagramEngagerId_fkey" FOREIGN KEY ("instagramEngagerId") REFERENCES "InstagramEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramMention" ADD CONSTRAINT "InstagramMention_instagramEngagerId_fkey" FOREIGN KEY ("instagramEngagerId") REFERENCES "InstagramEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramMentionComment" ADD CONSTRAINT "InstagramMentionComment_instagramEngagerId_fkey" FOREIGN KEY ("instagramEngagerId") REFERENCES "InstagramEngager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
