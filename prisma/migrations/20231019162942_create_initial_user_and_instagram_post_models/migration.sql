-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "instagram" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" TEXT NOT NULL,
    "postUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "pubDate" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "user_instagram" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfCnpj_key" ON "User"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_instagram_key" ON "User"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_id_key" ON "InstagramPost"("id");

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_user_instagram_fkey" FOREIGN KEY ("user_instagram") REFERENCES "User"("instagram") ON DELETE RESTRICT ON UPDATE CASCADE;
