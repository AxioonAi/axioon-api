/*
  Warnings:

  - Added the required column `politician_id` to the `PersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_data_id` to the `personalIncomeTaxReturns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalData" ADD COLUMN     "politician_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "personalIncomeTaxReturns" ADD COLUMN     "personal_data_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personalIncomeTaxReturns" ADD CONSTRAINT "personalIncomeTaxReturns_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
