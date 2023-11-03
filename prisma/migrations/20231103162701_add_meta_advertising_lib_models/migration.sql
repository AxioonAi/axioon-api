-- CreateTable
CREATE TABLE "MetaAdvertisingLib" (
    "id" TEXT NOT NULL,
    "impressions_lower_bound" TEXT NOT NULL,
    "inpressions_upper_bound" TEXT NOT NULL,
    "spend_lower_bound" TEXT NOT NULL,
    "spend_upper_bound" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "page_name" TEXT NOT NULL,
    "bylines" TEXT NOT NULL,
    "ad_snapshot_url" TEXT NOT NULL,
    "ad_delivery_start_time" TIMESTAMP(3) NOT NULL,
    "ad_delivery_stop_time" TIMESTAMP(3) NOT NULL,
    "ad_creation_time" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "MetaAdvertisingLibDemographicDistribution" (
    "id" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "advertising_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MetaAdvertisingLibDeliveryByRegion" (
    "id" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "advertising_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaAdvertisingLib_id_key" ON "MetaAdvertisingLib"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MetaAdvertisingLibDemographicDistribution_id_key" ON "MetaAdvertisingLibDemographicDistribution"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MetaAdvertisingLibDeliveryByRegion_id_key" ON "MetaAdvertisingLibDeliveryByRegion"("id");

-- AddForeignKey
ALTER TABLE "MetaAdvertisingLibDemographicDistribution" ADD CONSTRAINT "MetaAdvertisingLibDemographicDistribution_advertising_id_fkey" FOREIGN KEY ("advertising_id") REFERENCES "MetaAdvertisingLib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaAdvertisingLibDeliveryByRegion" ADD CONSTRAINT "MetaAdvertisingLibDeliveryByRegion_advertising_id_fkey" FOREIGN KEY ("advertising_id") REFERENCES "MetaAdvertisingLib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
