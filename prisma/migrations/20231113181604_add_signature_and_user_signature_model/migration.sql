-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'DISABLED');

-- CreateTable
CREATE TABLE "SignaturePlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pixValue" DOUBLE PRECISION NOT NULL,
    "creditValue" DOUBLE PRECISION NOT NULL,
    "amount_of_monitoring" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 12
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INACTIVE'
);

-- CreateIndex
CREATE UNIQUE INDEX "SignaturePlan_id_key" ON "SignaturePlan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_id_key" ON "UserPlan"("id");

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "SignaturePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
