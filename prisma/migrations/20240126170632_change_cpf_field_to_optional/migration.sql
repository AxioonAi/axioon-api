-- DropIndex
DROP INDEX "PoliticianProfile_cpf_key";

-- AlterTable
ALTER TABLE "PersonalData" ALTER COLUMN "estimated_patrimony" SET DEFAULT '',
ALTER COLUMN "estimated_recipe" SET DEFAULT '';

-- AlterTable
ALTER TABLE "PoliticianProfile" ALTER COLUMN "cpf" DROP NOT NULL;
