/*
  Warnings:

  - You are about to drop the column `aiChatId` on the `AiMessage` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `AiMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AiMessage" DROP CONSTRAINT "AiMessage_aiChatId_fkey";

-- AlterTable
ALTER TABLE "AiMessage" DROP COLUMN "aiChatId",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "AiChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
