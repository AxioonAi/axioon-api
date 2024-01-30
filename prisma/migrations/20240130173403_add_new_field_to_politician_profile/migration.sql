/*
  Warnings:

  - You are about to drop the column `bakAgency` on the `personalIncomeTaxReturns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LegalData" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "PoliticianProfile" ADD COLUMN     "campaign_number" TEXT;

-- AlterTable
ALTER TABLE "personalIncomeTaxReturns" DROP COLUMN "bakAgency",
ADD COLUMN     "bankAgency" TEXT;
