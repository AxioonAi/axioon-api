-- AlterTable
ALTER TABLE "MetaAdvertisingLib" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'INACTIVE',
ALTER COLUMN "ad_delivery_stop_time" DROP NOT NULL;
