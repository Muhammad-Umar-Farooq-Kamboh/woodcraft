/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Assigment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Assigment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assigment" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assigment_orderId_key" ON "Assigment"("orderId");

-- AddForeignKey
ALTER TABLE "Assigment" ADD CONSTRAINT "Assigment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
