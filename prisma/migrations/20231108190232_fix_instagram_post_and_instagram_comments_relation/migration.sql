/*
  Warnings:

  - Added the required column `post_id` to the `InstagramPostComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramPostComment" ADD COLUMN     "post_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InstagramPostComment" ADD CONSTRAINT "InstagramPostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "InstagramPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
