/*
  Warnings:

  - You are about to drop the column `user_instagram` on the `InstagramPost` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `InstagramPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InstagramPost" DROP CONSTRAINT "InstagramPost_user_instagram_fkey";

-- AlterTable
ALTER TABLE "InstagramPost" DROP COLUMN "user_instagram",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
