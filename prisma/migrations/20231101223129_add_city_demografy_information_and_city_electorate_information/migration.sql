/*
  Warnings:

  - Added the required column `complete_high_school` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complete_higher_education` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complete_primary_education` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eighteen_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eighty_five_to_eighty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eighty_to_eighty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electorate` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `female` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fifty_five_to_fifty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fifty_to_fifty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forty_five_to_forty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forty_to_forty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hundred_years_or_more` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomplete_high_school` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomplete_higher_education` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incomplete_primary_education` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `male` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nineteen_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ninety_five_to_ninety_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ninety_to_ninety_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `not_informed` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reads_and_writes` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seventeen_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seventy_five_to_seventy_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seventy_to_seventy_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sixteen_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sixty_five_to_sixty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sixty_to_sixty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirty_five_to_thirty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirty_to_thirty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twenty_five_to_twenty_nine_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twenty_one_to_twenty_four_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twenty_years` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `with_biometry` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `with_disability` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "complete_high_school" INTEGER NOT NULL,
ADD COLUMN     "complete_higher_education" INTEGER NOT NULL,
ADD COLUMN     "complete_primary_education" INTEGER NOT NULL,
ADD COLUMN     "eighteen_years" INTEGER NOT NULL,
ADD COLUMN     "eighty_five_to_eighty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "eighty_to_eighty_four_years" INTEGER NOT NULL,
ADD COLUMN     "electorate" INTEGER NOT NULL,
ADD COLUMN     "female" INTEGER NOT NULL,
ADD COLUMN     "fifty_five_to_fifty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "fifty_to_fifty_four_years" INTEGER NOT NULL,
ADD COLUMN     "forty_five_to_forty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "forty_to_forty_four_years" INTEGER NOT NULL,
ADD COLUMN     "hundred_years_or_more" INTEGER NOT NULL,
ADD COLUMN     "incomplete_high_school" INTEGER NOT NULL,
ADD COLUMN     "incomplete_higher_education" INTEGER NOT NULL,
ADD COLUMN     "incomplete_primary_education" INTEGER NOT NULL,
ADD COLUMN     "invalid" INTEGER,
ADD COLUMN     "male" INTEGER NOT NULL,
ADD COLUMN     "nineteen_years" INTEGER NOT NULL,
ADD COLUMN     "ninety_five_to_ninety_nine_years" INTEGER NOT NULL,
ADD COLUMN     "ninety_to_ninety_four_years" INTEGER NOT NULL,
ADD COLUMN     "not_informed" INTEGER NOT NULL,
ADD COLUMN     "reads_and_writes" INTEGER NOT NULL,
ADD COLUMN     "seventeen_years" INTEGER NOT NULL,
ADD COLUMN     "seventy_five_to_seventy_nine_years" INTEGER NOT NULL,
ADD COLUMN     "seventy_to_seventy_four_years" INTEGER NOT NULL,
ADD COLUMN     "sixteen_years" INTEGER NOT NULL,
ADD COLUMN     "sixty_five_to_sixty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "sixty_to_sixty_four_years" INTEGER NOT NULL,
ADD COLUMN     "thirty_five_to_thirty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "thirty_to_thirty_four_years" INTEGER NOT NULL,
ADD COLUMN     "twenty_five_to_twenty_nine_years" INTEGER NOT NULL,
ADD COLUMN     "twenty_one_to_twenty_four_years" INTEGER NOT NULL,
ADD COLUMN     "twenty_years" INTEGER NOT NULL,
ADD COLUMN     "with_biometry" INTEGER NOT NULL,
ADD COLUMN     "with_disability" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CityIBGEData" (
    "id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "total_zero_to_four" INTEGER NOT NULL,
    "total_five_to_nine" INTEGER NOT NULL,
    "total_ten_to_fourteen" INTEGER NOT NULL,
    "total_fifteen_to_nineteen" INTEGER NOT NULL,
    "total_twenty_to_twenty_four" INTEGER NOT NULL,
    "total_twenty_five_to_twenty_nine" INTEGER NOT NULL,
    "total_thirty_to_thirty_four" INTEGER NOT NULL,
    "total_thirty_five_to_thirty_nine" INTEGER NOT NULL,
    "total_forty_to_forty_four" INTEGER NOT NULL,
    "total_forty_five_to_forty_nine" INTEGER NOT NULL,
    "total_fifty_to_fifty_four" INTEGER NOT NULL,
    "total_fifty_five_to_fifty_nine" INTEGER NOT NULL,
    "total_sixty_to_sixty_four" INTEGER NOT NULL,
    "total_sixty_five_to_sixty_nine" INTEGER NOT NULL,
    "total_seventy_to_seventy_four" INTEGER NOT NULL,
    "total_seventy_five_to_seventy_nine" INTEGER NOT NULL,
    "total_eighty_to_eighty_four" INTEGER NOT NULL,
    "total_eighty_five_to_eighty_nine" INTEGER NOT NULL,
    "total_ninety_to_ninety_four" INTEGER NOT NULL,
    "total_ninety_five_to_ninety_nine" INTEGER NOT NULL,
    "total_hundred_and_up" INTEGER NOT NULL,
    "male_total" INTEGER NOT NULL,
    "male_zero_to_four" INTEGER NOT NULL,
    "male_five_to_nine" INTEGER NOT NULL,
    "male_ten_to_fourteen" INTEGER NOT NULL,
    "male_fifteen_to_nineteen" INTEGER NOT NULL,
    "male_twenty_to_twenty_four" INTEGER NOT NULL,
    "male_twenty_five_to_twenty_nine" INTEGER NOT NULL,
    "male_thirty_to_thirty_four" INTEGER NOT NULL,
    "male_thirty_five_to_thirty_nine" INTEGER NOT NULL,
    "male_forty_to_forty_four" INTEGER NOT NULL,
    "male_forty_five_to_forty_nine" INTEGER NOT NULL,
    "male_fifty_to_fifty_four" INTEGER NOT NULL,
    "male_fifty_five_to_fifty_nine" INTEGER NOT NULL,
    "male_sixty_to_sixty_four" INTEGER NOT NULL,
    "male_sixty_five_to_sixty_nine" INTEGER NOT NULL,
    "male_seventy_to_seventy_four" INTEGER NOT NULL,
    "male_seventy_five_to_seventy_nine" INTEGER NOT NULL,
    "male_eighty_to_eighty_four" INTEGER NOT NULL,
    "male_eighty_five_to_eighty_nine" INTEGER NOT NULL,
    "male_ninety_to_ninety_four" INTEGER NOT NULL,
    "male_ninety_five_to_ninety_nine" INTEGER NOT NULL,
    "male_hundred_and_up" INTEGER NOT NULL,
    "female_total" INTEGER NOT NULL,
    "female_zero_to_four" INTEGER NOT NULL,
    "female_five_to_nine" INTEGER NOT NULL,
    "female_ten_to_fourteen" INTEGER NOT NULL,
    "female_fifteen_to_nineteen" INTEGER NOT NULL,
    "female_twenty_to_twenty_four" INTEGER NOT NULL,
    "female_twenty_five_to_twenty_nine" INTEGER NOT NULL,
    "female_thirty_to_thirty_four" INTEGER NOT NULL,
    "female_thirty_five_to_thirty_nine" INTEGER NOT NULL,
    "female_forty_to_forty_four" INTEGER NOT NULL,
    "female_forty_five_to_forty_nine" INTEGER NOT NULL,
    "female_fifty_to_fifty_four" INTEGER NOT NULL,
    "female_fifty_five_to_fifty_nine" INTEGER NOT NULL,
    "female_sixty_to_sixty_four" INTEGER NOT NULL,
    "female_sixty_five_to_sixty_nine" INTEGER NOT NULL,
    "female_seventy_to_seventy_four" INTEGER NOT NULL,
    "female_seventy_five_to_seventy_nine" INTEGER NOT NULL,
    "female_eighty_to_eighty_four" INTEGER NOT NULL,
    "female_eighty_five_to_eighty_nine" INTEGER NOT NULL,
    "female_ninety_to_ninety_four" INTEGER NOT NULL,
    "female_ninety_five_to_ninety_nine" INTEGER NOT NULL,
    "female_hundred_and_up" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CityIBGEData_id_key" ON "CityIBGEData"("id");

-- AddForeignKey
ALTER TABLE "CityIBGEData" ADD CONSTRAINT "CityIBGEData_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
