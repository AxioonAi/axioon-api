/*
  Warnings:

  - You are about to drop the column `user_id` on the `MetaAdvertisingLib` table. All the data in the column will be lost.
  - Added the required column `politician_id` to the `MetaAdvertisingLib` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MetaAdvertisingLib" DROP COLUMN "user_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MetaAdvertisingLib" ADD CONSTRAINT "MetaAdvertisingLib_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
