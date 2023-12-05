-- CreateTable
CREATE TABLE "FacebookPostComments" (
    "id" TEXT NOT NULL,
    "postUrl" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "politician_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FacebookPostComments_id_key" ON "FacebookPostComments"("id");

-- AddForeignKey
ALTER TABLE "FacebookPostComments" ADD CONSTRAINT "FacebookPostComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "FacebookPostBaseData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookPostComments" ADD CONSTRAINT "FacebookPostComments_politician_id_fkey" FOREIGN KEY ("politician_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
