-- CreateTable
CREATE TABLE "UserRecoverPasswordCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRecoverPasswordCode_id_key" ON "UserRecoverPasswordCode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRecoverPasswordCode_code_key" ON "UserRecoverPasswordCode"("code");

-- AddForeignKey
ALTER TABLE "UserRecoverPasswordCode" ADD CONSTRAINT "UserRecoverPasswordCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
