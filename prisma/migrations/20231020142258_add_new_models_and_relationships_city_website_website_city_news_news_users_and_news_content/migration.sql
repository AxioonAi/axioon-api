/*
  Warnings:

  - Added the required column `city_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "social_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WebsiteCity" (
    "id" TEXT NOT NULL,
    "website_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NewsUsers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NewsContent" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "news_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_id_key" ON "Website"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteCity_id_key" ON "WebsiteCity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "News_id_key" ON "News"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NewsUsers_id_key" ON "NewsUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NewsContent_id_key" ON "NewsContent"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteCity" ADD CONSTRAINT "WebsiteCity_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteCity" ADD CONSTRAINT "WebsiteCity_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsUsers" ADD CONSTRAINT "NewsUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsUsers" ADD CONSTRAINT "NewsUsers_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsContent" ADD CONSTRAINT "NewsContent_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
