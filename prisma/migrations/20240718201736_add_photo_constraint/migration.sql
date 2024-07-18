/*
  Warnings:

  - A unique constraint covering the columns `[userId,themeId,contestId]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photo_userId_themeId_contestId_key" ON "Photo"("userId", "themeId", "contestId");
