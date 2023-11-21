/*
  Warnings:

  - You are about to drop the column `followers` on the `TicktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `posts_comments_count` on the `TicktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `posts_count` on the `TicktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `posts_likes_count` on the `TicktokBaseData` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fans` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heart` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videos` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicktokBaseData" DROP COLUMN "followers",
DROP COLUMN "posts_comments_count",
DROP COLUMN "posts_count",
DROP COLUMN "posts_likes_count",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "fans" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "heart" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL,
ADD COLUMN     "videos" DOUBLE PRECISION NOT NULL;
