-- CreateTable
CREATE TABLE "SubUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubUser_id_key" ON "SubUser"("id");

-- AddForeignKey
ALTER TABLE "SubUser" ADD CONSTRAINT "SubUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
