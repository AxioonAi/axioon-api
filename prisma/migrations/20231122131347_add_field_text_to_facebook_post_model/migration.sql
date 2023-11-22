/*
  Warnings:

  - Added the required column `text` to the `FacebookPostBaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FacebookPostBaseData" ADD COLUMN     "text" TEXT NOT NULL;
