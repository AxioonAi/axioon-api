/*
  Warnings:

  - Added the required column `instagram` to the `PoliticianProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PoliticianProfile" ADD COLUMN     "instagram" TEXT NOT NULL;
