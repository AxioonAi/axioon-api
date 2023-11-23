/*
  Warnings:

  - You are about to drop the `WebsiteCity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `state_capital_id` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WebsiteCity" DROP CONSTRAINT "WebsiteCity_city_id_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteCity" DROP CONSTRAINT "WebsiteCity_website_id_fkey";

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "state_capital_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "WebsiteCity";

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_state_capital_id_fkey" FOREIGN KEY ("state_capital_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
