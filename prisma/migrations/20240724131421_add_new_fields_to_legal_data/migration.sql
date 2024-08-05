-- AlterTable
ALTER TABLE "LegalData" ADD COLUMN     "area" TEXT,
ADD COLUMN     "class" TEXT,
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "justiceSecret" TEXT,
ADD COLUMN     "system" TEXT;

-- CreateTable
CREATE TABLE "legalDataInvolved" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "law_suits_quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "pole" TEXT NOT NULL,
    "person" TEXT NOT NULL,
    "legalDataId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "legalDataInvolved_id_key" ON "legalDataInvolved"("id");

-- AddForeignKey
ALTER TABLE "legalDataInvolved" ADD CONSTRAINT "legalDataInvolved_legalDataId_fkey" FOREIGN KEY ("legalDataId") REFERENCES "LegalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
