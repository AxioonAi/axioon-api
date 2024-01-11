-- CreateTable
CREATE TABLE "LegalData" (
    "id" TEXT NOT NULL,
    "activePole" TEXT NOT NULL,
    "passivePole" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "judgingBy" TEXT NOT NULL,
    "causeValue" TEXT NOT NULL,
    "court" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalData_id_key" ON "LegalData"("id");

-- AddForeignKey
ALTER TABLE "LegalData" ADD CONSTRAINT "LegalData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
