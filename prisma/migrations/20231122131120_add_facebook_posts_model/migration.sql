-- CreateTable
CREATE TABLE "FacebookPostBaseData" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "like" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FacebookPostBaseData_id_key" ON "FacebookPostBaseData"("id");

-- AddForeignKey
ALTER TABLE "FacebookPostBaseData" ADD CONSTRAINT "FacebookPostBaseData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
