-- AlterTable
ALTER TABLE "News" ADD COLUMN     "website_id" TEXT;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
