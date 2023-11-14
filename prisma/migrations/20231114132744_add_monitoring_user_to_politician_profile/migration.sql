-- CreateTable
CREATE TABLE "PoliticianProfileMonitoring" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "politician_profile_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PoliticianProfileMonitoring_id_key" ON "PoliticianProfileMonitoring"("id");

-- AddForeignKey
ALTER TABLE "PoliticianProfileMonitoring" ADD CONSTRAINT "PoliticianProfileMonitoring_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticianProfileMonitoring" ADD CONSTRAINT "PoliticianProfileMonitoring_politician_profile_id_fkey" FOREIGN KEY ("politician_profile_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
