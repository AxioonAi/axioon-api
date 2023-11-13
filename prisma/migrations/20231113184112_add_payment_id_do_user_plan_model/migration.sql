/*
  Warnings:

  - Added the required column `paymentId` to the `UserPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPlan" ADD COLUMN     "paymentId" TEXT NOT NULL;
