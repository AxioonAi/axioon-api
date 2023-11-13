/*
  Warnings:

  - Added the required column `mobilePhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobilePhone" TEXT NOT NULL;
