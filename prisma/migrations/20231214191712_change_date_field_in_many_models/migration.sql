/*
  Warnings:

  - You are about to drop the column `end_of_period` on the `FacebookBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `start_of_period` on the `FacebookBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `end_of_period` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `start_of_period` on the `InstagramBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `end_of_period` on the `TiktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `start_of_period` on the `TiktokBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `end_of_period` on the `TwitterBaseData` table. All the data in the column will be lost.
  - You are about to drop the column `start_of_period` on the `TwitterBaseData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FacebookBaseData" DROP COLUMN "end_of_period",
DROP COLUMN "start_of_period",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "InstagramBaseData" DROP COLUMN "end_of_period",
DROP COLUMN "start_of_period",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TiktokBaseData" DROP COLUMN "end_of_period",
DROP COLUMN "start_of_period",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TwitterBaseData" DROP COLUMN "end_of_period",
DROP COLUMN "start_of_period",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
