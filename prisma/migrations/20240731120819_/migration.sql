-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('USER', 'AI');

-- CreateTable
CREATE TABLE "AiChat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AiMessage" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "ChatType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aiChatId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AiChat_id_key" ON "AiChat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiMessage_id_key" ON "AiMessage"("id");

-- AddForeignKey
ALTER TABLE "AiChat" ADD CONSTRAINT "AiChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_aiChatId_fkey" FOREIGN KEY ("aiChatId") REFERENCES "AiChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
