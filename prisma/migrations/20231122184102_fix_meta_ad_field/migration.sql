/*
  Warnings:

  - You are about to drop the column `inpressions_upper_bound` on the `MetaAdvertisingLib` table. All the data in the column will be lost.
  - Added the required column `impressions_upper_bound` to the `MetaAdvertisingLib` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MetaAdvertisingLib" DROP COLUMN "inpressions_upper_bound",
ADD COLUMN     "impressions_upper_bound" TEXT NOT NULL;
