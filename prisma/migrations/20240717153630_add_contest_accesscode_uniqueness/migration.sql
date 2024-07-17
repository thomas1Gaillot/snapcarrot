/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contest_accessCode_key" ON "Contest"("accessCode");
