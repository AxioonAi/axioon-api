/*
  Warnings:

  - You are about to drop the column `ellection_year` on the `ElectoralHistory` table. All the data in the column will be lost.
  - Added the required column `election_year` to the `ElectoralHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ElectoralHistory" DROP COLUMN "ellection_year",
ADD COLUMN     "election_year" TEXT NOT NULL;
