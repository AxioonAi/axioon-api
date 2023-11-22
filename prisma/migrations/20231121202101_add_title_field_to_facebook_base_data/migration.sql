/*
  Warnings:

  - Added the required column `title` to the `FacebookBaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FacebookBaseData" ADD COLUMN     "title" TEXT NOT NULL;
