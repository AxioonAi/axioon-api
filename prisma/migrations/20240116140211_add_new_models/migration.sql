-- CreateTable
CREATE TABLE "PersonalData" (
    "id" TEXT NOT NULL,
    "federalStatus" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "federalCrime" TEXT NOT NULL,
    "federalCrimeCertificate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalAddress" (
    "id" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "addressType" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "personal_data_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalEconomicRelationship" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "relationshipLevel" TEXT NOT NULL,
    "personal_data_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "personalIncomeTaxReturns" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "bakAgency" TEXT,
    "situation" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_id_key" ON "PersonalData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalAddress_id_key" ON "PersonalAddress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalEconomicRelationship_id_key" ON "PersonalEconomicRelationship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "personalIncomeTaxReturns_id_key" ON "personalIncomeTaxReturns"("id");

-- AddForeignKey
ALTER TABLE "PersonalAddress" ADD CONSTRAINT "PersonalAddress_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalEconomicRelationship" ADD CONSTRAINT "PersonalEconomicRelationship_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
