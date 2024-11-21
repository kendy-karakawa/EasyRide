/*
  Warnings:

  - You are about to drop the column `custimerId` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the `DriverRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[driverId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driverId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "DriverRating" DROP CONSTRAINT "DriverRating_driverId_fkey";

-- DropForeignKey
ALTER TABLE "DriverRating" DROP CONSTRAINT "DriverRating_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_custimerId_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "driverId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "custimerId",
DROP COLUMN "timeStamp",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "DriverRating";

-- CreateIndex
CREATE UNIQUE INDEX "Review_driverId_key" ON "Review"("driverId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
