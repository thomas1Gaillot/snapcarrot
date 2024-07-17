/*
  Warnings:

  - Changed the type of `status` on the `Contest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('open', 'voting', 'result');

-- AlterTable
ALTER TABLE "Contest" ALTER COLUMN "winner" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;
