/*
  Warnings:

  - You are about to drop the column `personal_data_id` on the `PersonalAddress` table. All the data in the column will be lost.
  - You are about to drop the column `personal_data_id` on the `PersonalEconomicRelationship` table. All the data in the column will be lost.
  - You are about to drop the column `personal_data_id` on the `personalIncomeTaxReturns` table. All the data in the column will be lost.
  - Added the required column `politician_id` to the `PersonalAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `PersonalEconomicRelationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politician_id` to the `personalIncomeTaxReturns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonalAddress" DROP CONSTRAINT "PersonalAddress_personal_data_id_fkey";

-- DropForeignKey
ALTER TABLE "PersonalEconomicRelationship" DROP CONSTRAINT "PersonalEconomicRelationship_personal_data_id_fkey";

-- DropForeignKey
ALTER TABLE "personalIncomeTaxReturns" DROP CONSTRAINT "personalIncomeTaxReturns_personal_data_id_fkey";

-- AlterTable
ALTER TABLE "PersonalAddress" DROP COLUMN "personal_data_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalEconomicRelationship" DROP COLUMN "personal_data_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "personalIncomeTaxReturns" DROP COLUMN "personal_data_id",
ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonalAddress" ADD CONSTRAINT "PersonalAddress_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalEconomicRelationship" ADD CONSTRAINT "PersonalEconomicRelationship_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalIncomeTaxReturns" ADD CONSTRAINT "personalIncomeTaxReturns_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
