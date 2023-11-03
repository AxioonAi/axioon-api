/*
  Warnings:

  - You are about to drop the `NewsContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CoverageTypes" AS ENUM ('CITY', 'STATE', 'COUNTRY');

-- CreateEnum
CREATE TYPE "NewsScore" AS ENUM ('IRRELEVANT', 'NORMAL', 'IMPORTANT', 'URGENT');

-- DropForeignKey
ALTER TABLE "NewsContent" DROP CONSTRAINT "NewsContent_news_id_fkey";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "score" "NewsScore" NOT NULL DEFAULT 'IRRELEVANT';

-- DropTable
DROP TABLE "NewsContent";

-- CreateTable
CREATE TABLE "InstagramBaseData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "posts_count" INTEGER NOT NULL,
    "posts_comments_count" INTEGER NOT NULL,
    "posts_likes_count" INTEGER NOT NULL,
    "reels_count" INTEGER NOT NULL,
    "reels_likes_count" INTEGER NOT NULL,
    "reels_comments_count" INTEGER NOT NULL,
    "reels_views_count" INTEGER NOT NULL,
    "start_of_period" TIMESTAMP(3) NOT NULL,
    "end_of_period" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TicktokBaseData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "posts_count" INTEGER NOT NULL,
    "posts_comments_count" INTEGER NOT NULL,
    "posts_likes_count" INTEGER NOT NULL,
    "start_of_period" TIMESTAMP(3) NOT NULL,
    "end_of_period" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TwitterBaseData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "posts_count" INTEGER NOT NULL,
    "posts_comments_count" INTEGER NOT NULL,
    "posts_likes_count" INTEGER NOT NULL,
    "retweet_count" INTEGER NOT NULL,
    "favorite_count" INTEGER NOT NULL,
    "start_of_period" TIMESTAMP(3) NOT NULL,
    "end_of_period" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FacebookBaseData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "followers_count" INTEGER NOT NULL,
    "start_of_period" TIMESTAMP(3) NOT NULL,
    "end_of_period" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PolicalGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "instagram" TEXT,
    "ticktok" TEXT,
    "youtube" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "president" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PolicalPosition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coverage" "CoverageTypes" NOT NULL DEFAULT 'CITY'
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramBaseData_id_key" ON "InstagramBaseData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TicktokBaseData_id_key" ON "TicktokBaseData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterBaseData_id_key" ON "TwitterBaseData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookBaseData_id_key" ON "FacebookBaseData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PolicalGroup_id_key" ON "PolicalGroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PolicalPosition_id_key" ON "PolicalPosition"("id");

-- AddForeignKey
ALTER TABLE "InstagramBaseData" ADD CONSTRAINT "InstagramBaseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicktokBaseData" ADD CONSTRAINT "TicktokBaseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterBaseData" ADD CONSTRAINT "TwitterBaseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookBaseData" ADD CONSTRAINT "FacebookBaseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
