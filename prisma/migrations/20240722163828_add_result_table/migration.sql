-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contestId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_userId_contestId_key" ON "Result"("userId", "contestId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
