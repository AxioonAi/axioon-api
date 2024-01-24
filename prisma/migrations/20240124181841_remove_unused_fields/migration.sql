/*
  Warnings:

  - You are about to drop the column `endDate` on the `PersonalEconomicRelationship` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `PersonalEconomicRelationship` table. All the data in the column will be lost.
  - Added the required column `estimated_patrimony` to the `PersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_recipe` to the `PersonalData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalData" ADD COLUMN     "estimated_patrimony" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "estimated_recipe" TEXT NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "PersonalEconomicRelationship" DROP COLUMN "endDate",
DROP COLUMN "startDate";
