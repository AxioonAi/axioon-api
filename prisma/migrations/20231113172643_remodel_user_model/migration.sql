/*
  Warnings:

  - You are about to drop the column `instagram` on the `User` table. All the data in the column will be lost.
  - Added the required column `political_group_id` to the `PoliticianProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SexType" AS ENUM ('MALE', 'FEMALE');

-- DropIndex
DROP INDEX "User_instagram_key";

-- AlterTable
ALTER TABLE "PoliticianProfile" ADD COLUMN     "political_group_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "instagram",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sex" "SexType" NOT NULL DEFAULT 'MALE';

-- AddForeignKey
ALTER TABLE "PoliticianProfile" ADD CONSTRAINT "PoliticianProfile_political_group_id_fkey" FOREIGN KEY ("political_group_id") REFERENCES "PolicalGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
