/*
  Warnings:

  - You are about to drop the column `user_id` on the `FacebookBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `InstagramMention` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `InstagramPost` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `NewsUsers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `TicktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `TwitterBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `YoutubeBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `YoutubeVideoData` table. All the data in the column will be lost.
  - Added the required column `politician_id` to the `FacebookBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `InstagramBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `InstagramMention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `InstagramPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `NewsUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `TicktokBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `TwitterBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `YoutubeBaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `YoutubeVideoData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MAYOR', 'ALDERMAN');

-- DropForeignKey
ALTER TABLE "FacebookBaseData" DROP CONSTRAINT "FacebookBaseData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "InstagramBaseData" DROP CONSTRAINT "InstagramBaseData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "InstagramMention" DROP CONSTRAINT "InstagramMention_user_id_fkey";

-- DropForeignKey
ALTER TABLE "InstagramPost" DROP CONSTRAINT "InstagramPost_user_id_fkey";

-- DropForeignKey
ALTER TABLE "NewsUsers" DROP CONSTRAINT "NewsUsers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TicktokBaseData" DROP CONSTRAINT "TicktokBaseData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TwitterBaseData" DROP CONSTRAINT "TwitterBaseData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_city_id_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeBaseData" DROP CONSTRAINT "YoutubeBaseData_user_id_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeVideoData" DROP CONSTRAINT "YoutubeVideoData_user_id_fkey";

-- AlterTable
ALTER TABLE "FacebookBaseData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InstagramBaseData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InstagramMention" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InstagramPost" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NewsUsers" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TicktokBaseData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TwitterBaseData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city_id",
DROP COLUMN "facebook",
DROP COLUMN "tiktok",
DROP COLUMN "youtube";

-- AlterTable
ALTER TABLE "YoutubeBaseData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "YoutubeVideoData" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PoliticianProfile" (
    "id" TEXT NOT NULL,
    "social_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MAYOR',
    "city_id" TEXT NOT NULL,
    "youtube" TEXT,
    "tiktok" TEXT,
    "facebook" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PoliticianProfile_id_key" ON "PoliticianProfile"("id");

-- AddForeignKey
ALTER TABLE "PoliticianProfile" ADD CONSTRAINT "PoliticianProfile_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramBaseData" ADD CONSTRAINT "InstagramBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicktokBaseData" ADD CONSTRAINT "TicktokBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterBaseData" ADD CONSTRAINT "TwitterBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeBaseData" ADD CONSTRAINT "YoutubeBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeVideoData" ADD CONSTRAINT "YoutubeVideoData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookBaseData" ADD CONSTRAINT "FacebookBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramMention" ADD CONSTRAINT "InstagramMention_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsUsers" ADD CONSTRAINT "NewsUsers_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
