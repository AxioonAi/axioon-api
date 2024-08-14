/*
  Warnings:

  - You are about to drop the column `campagn_total_spend` on the `ElectoralHistory` table. All the data in the column will be lost.
  - You are about to drop the column `ocupation` on the `ElectoralHistory` table. All the data in the column will be lost.
  - You are about to drop the column `toal_declared_assets` on the `ElectoralHistory` table. All the data in the column will be lost.
  - Added the required column `campaign_total_spend` to the `ElectoralHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `ElectoralHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_declared_assets` to the `ElectoralHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ElectoralHistory" DROP COLUMN "campagn_total_spend",
DROP COLUMN "ocupation",
DROP COLUMN "toal_declared_assets",
ADD COLUMN     "campaign_total_spend" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL,
ADD COLUMN     "total_declared_assets" DOUBLE PRECISION NOT NULL;
