/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `PoliticianProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `PoliticianProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PoliticianProfile" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PoliticianProfile_cpf_key" ON "PoliticianProfile"("cpf");
