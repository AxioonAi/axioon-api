/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `UserPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_paymentId_key" ON "UserPlan"("paymentId");
