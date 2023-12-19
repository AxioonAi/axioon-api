-- CreateTable
CREATE TABLE "tutorialVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tutorialVideo_id_key" ON "tutorialVideo"("id");
