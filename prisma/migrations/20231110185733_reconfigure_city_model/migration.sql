/*
  Warnings:

  - You are about to drop the column `complete_high_school` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `complete_higher_education` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `complete_primary_education` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `eighteen_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `eighty_five_to_eighty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `eighty_to_eighty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `electorate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `female` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `fifty_five_to_fifty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `fifty_to_fifty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `forty_five_to_forty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `forty_to_forty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `hundred_years_or_more` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `illiterate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `incomplete_high_school` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `incomplete_higher_education` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `incomplete_primary_education` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `invalid` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `male` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `nineteen_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `ninety_five_to_ninety_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `ninety_to_ninety_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `not_informed` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `reads_and_writes` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `seventeen_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `seventy_five_to_seventy_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `seventy_to_seventy_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `sixteen_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `sixty_five_to_sixty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `sixty_to_sixty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `thirty_five_to_thirty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `thirty_to_thirty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `twenty_five_to_twenty_nine_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `twenty_one_to_twenty_four_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `twenty_years` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `with_biometry` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `with_disability` on the `City` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "complete_high_school",
DROP COLUMN "complete_higher_education",
DROP COLUMN "complete_primary_education",
DROP COLUMN "eighteen_years",
DROP COLUMN "eighty_five_to_eighty_nine_years",
DROP COLUMN "eighty_to_eighty_four_years",
DROP COLUMN "electorate",
DROP COLUMN "female",
DROP COLUMN "fifty_five_to_fifty_nine_years",
DROP COLUMN "fifty_to_fifty_four_years",
DROP COLUMN "forty_five_to_forty_nine_years",
DROP COLUMN "forty_to_forty_four_years",
DROP COLUMN "hundred_years_or_more",
DROP COLUMN "illiterate",
DROP COLUMN "incomplete_high_school",
DROP COLUMN "incomplete_higher_education",
DROP COLUMN "incomplete_primary_education",
DROP COLUMN "invalid",
DROP COLUMN "male",
DROP COLUMN "nineteen_years",
DROP COLUMN "ninety_five_to_ninety_nine_years",
DROP COLUMN "ninety_to_ninety_four_years",
DROP COLUMN "not_informed",
DROP COLUMN "reads_and_writes",
DROP COLUMN "seventeen_years",
DROP COLUMN "seventy_five_to_seventy_nine_years",
DROP COLUMN "seventy_to_seventy_four_years",
DROP COLUMN "sixteen_years",
DROP COLUMN "sixty_five_to_sixty_nine_years",
DROP COLUMN "sixty_to_sixty_four_years",
DROP COLUMN "thirty_five_to_thirty_nine_years",
DROP COLUMN "thirty_to_thirty_four_years",
DROP COLUMN "twenty_five_to_twenty_nine_years",
DROP COLUMN "twenty_one_to_twenty_four_years",
DROP COLUMN "twenty_years",
DROP COLUMN "with_biometry",
DROP COLUMN "with_disability";

-- CreateTable
CREATE TABLE "CityPollingPlace" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "city_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CityElectorateData" (
    "id" TEXT NOT NULL,
    "illiterate" INTEGER NOT NULL DEFAULT 0,
    "complete_primary_education" INTEGER NOT NULL DEFAULT 0,
    "incomplete_primary_education" INTEGER NOT NULL DEFAULT 0,
    "complete_high_school" INTEGER NOT NULL DEFAULT 0,
    "incomplete_high_school" INTEGER NOT NULL DEFAULT 0,
    "reads_and_writes" INTEGER NOT NULL DEFAULT 0,
    "not_informed" INTEGER NOT NULL DEFAULT 0,
    "complete_higher_education" INTEGER NOT NULL DEFAULT 0,
    "incomplete_higher_education" INTEGER NOT NULL DEFAULT 0,
    "hundred_years_or_more" INTEGER NOT NULL DEFAULT 0,
    "sixteen_years" INTEGER NOT NULL DEFAULT 0,
    "seventeen_years" INTEGER NOT NULL DEFAULT 0,
    "eighteen_years" INTEGER NOT NULL DEFAULT 0,
    "nineteen_years" INTEGER NOT NULL DEFAULT 0,
    "twenty_years" INTEGER NOT NULL DEFAULT 0,
    "twenty_one_to_twenty_four_years" INTEGER NOT NULL DEFAULT 0,
    "twenty_five_to_twenty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "thirty_to_thirty_four_years" INTEGER NOT NULL DEFAULT 0,
    "thirty_five_to_thirty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "forty_to_forty_four_years" INTEGER NOT NULL DEFAULT 0,
    "forty_five_to_forty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "fifty_to_fifty_four_years" INTEGER NOT NULL DEFAULT 0,
    "fifty_five_to_fifty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "sixty_to_sixty_four_years" INTEGER NOT NULL DEFAULT 0,
    "sixty_five_to_sixty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "seventy_to_seventy_four_years" INTEGER NOT NULL DEFAULT 0,
    "seventy_five_to_seventy_nine_years" INTEGER NOT NULL DEFAULT 0,
    "eighty_to_eighty_four_years" INTEGER NOT NULL DEFAULT 0,
    "eighty_five_to_eighty_nine_years" INTEGER NOT NULL DEFAULT 0,
    "ninety_to_ninety_four_years" INTEGER NOT NULL DEFAULT 0,
    "ninety_five_to_ninety_nine_years" INTEGER NOT NULL DEFAULT 0,
    "invalid" INTEGER NOT NULL DEFAULT 0,
    "female" INTEGER NOT NULL DEFAULT 0,
    "male" INTEGER NOT NULL DEFAULT 0,
    "electorate" INTEGER NOT NULL DEFAULT 0,
    "with_biometry" INTEGER NOT NULL DEFAULT 0,
    "with_disability" INTEGER NOT NULL DEFAULT 0,
    "city_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CityPollingPlace_id_key" ON "CityPollingPlace"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CityElectorateData_id_key" ON "CityElectorateData"("id");

-- AddForeignKey
ALTER TABLE "CityPollingPlace" ADD CONSTRAINT "CityPollingPlace_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityElectorateData" ADD CONSTRAINT "CityElectorateData_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
