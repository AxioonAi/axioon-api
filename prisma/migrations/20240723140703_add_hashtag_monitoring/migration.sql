-- AlterTable
ALTER TABLE "SignaturePlan" ADD COLUMN     "amount_of_hashtags" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" TEXT NOT NULL,
    "hashtag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HashtagMonitoring" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "hashtag_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_id_key" ON "Hashtag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HashtagMonitoring_id_key" ON "HashtagMonitoring"("id");

-- AddForeignKey
ALTER TABLE "HashtagMonitoring" ADD CONSTRAINT "HashtagMonitoring_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HashtagMonitoring" ADD CONSTRAINT "HashtagMonitoring_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
