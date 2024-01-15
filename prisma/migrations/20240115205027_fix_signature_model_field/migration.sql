/*
  Warnings:

  - You are about to drop the column `polulation_data` on the `SignaturePlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SignaturePlan" DROP COLUMN "polulation_data",
ADD COLUMN     "population_data" BOOLEAN NOT NULL DEFAULT false;
