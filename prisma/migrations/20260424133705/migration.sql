/*
  Warnings:

  - You are about to alter the column `unit` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "unit" SET DATA TYPE DECIMAL(10,2);
