/*
  Warnings:

  - You are about to drop the column `posts_comments_count` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `posts_likes_count` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `reels_comments_count` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `reels_likes_count` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `reels_views_count` on the `InstagramBaseData` table. All the data in the column will be lost.
  - Added the required column `biography` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follows` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramBaseData" DROP COLUMN "posts_comments_count",
DROP COLUMN "posts_likes_count",
DROP COLUMN "reels_comments_count",
DROP COLUMN "reels_likes_count",
DROP COLUMN "reels_views_count",
ADD COLUMN     "biography" TEXT NOT NULL,
ADD COLUMN     "business" BOOLEAN NOT NULL,
ADD COLUMN     "follows" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL;
