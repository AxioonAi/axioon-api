-- AlterTable
ALTER TABLE "SignaturePlan" ADD COLUMN     "ai_access" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "amount_of_users" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "electoral_history" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "facebook_ads_monitoring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "legal_data" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "political_accessory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "polulation_data" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "amount_of_monitoring" SET DEFAULT 1;
