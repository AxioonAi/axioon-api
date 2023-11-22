/*
  Warnings:

  - Added the required column `sentimentAnalysis` to the `InstagramMention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `InstagramMentionComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentimentAnalysis` to the `InstagramMentionComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `InstagramPostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentimentAnalysis` to the `InstagramPostComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InstagramMention" ADD COLUMN     "sentimentAnalysis" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "InstagramMentionComment" ADD COLUMN     "politician_id" TEXT NOT NULL,
ADD COLUMN     "sentimentAnalysis" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "InstagramPostComment" ADD COLUMN     "politician_id" TEXT NOT NULL,
ADD COLUMN     "sentimentAnalysis" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "InstagramPostComment" ADD CONSTRAINT "InstagramPostComment_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramMentionComment" ADD CONSTRAINT "InstagramMentionComment_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
