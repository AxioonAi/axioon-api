-- CreateTable
CREATE TABLE "TiktokVideoData" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "diggCount" INTEGER NOT NULL,
    "shareCount" INTEGER NOT NULL,
    "playCount" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TiktokVideoData_id_key" ON "TiktokVideoData"("id");

-- AddForeignKey
ALTER TABLE "TiktokVideoData" ADD CONSTRAINT "TiktokVideoData_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
