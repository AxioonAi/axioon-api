-- CreateTable
CREATE TABLE "Notary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "numberOfTitles" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "politicianProfileId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Protests" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "protestDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "notaryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Notary_id_key" ON "Notary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Protests_id_key" ON "Protests"("id");

-- AddForeignKey
ALTER TABLE "Notary" ADD CONSTRAINT "Notary_politicianProfileId_fkey" FOREIGN KEY ("politicianProfileId") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protests" ADD CONSTRAINT "Protests_notaryId_fkey" FOREIGN KEY ("notaryId") REFERENCES "Notary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
