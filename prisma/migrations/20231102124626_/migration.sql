/*
  Warnings:

  - Made the column `invalid` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "complete_high_school" SET DEFAULT 0,
ALTER COLUMN "complete_higher_education" SET DEFAULT 0,
ALTER COLUMN "complete_primary_education" SET DEFAULT 0,
ALTER COLUMN "hundred_years_or_more" SET DEFAULT 0,
ALTER COLUMN "incomplete_high_school" SET DEFAULT 0,
ALTER COLUMN "incomplete_higher_education" SET DEFAULT 0,
ALTER COLUMN "incomplete_primary_education" SET DEFAULT 0,
ALTER COLUMN "invalid" SET NOT NULL,
ALTER COLUMN "invalid" SET DEFAULT 0,
ALTER COLUMN "not_informed" SET DEFAULT 0,
ALTER COLUMN "reads_and_writes" SET DEFAULT 0;
