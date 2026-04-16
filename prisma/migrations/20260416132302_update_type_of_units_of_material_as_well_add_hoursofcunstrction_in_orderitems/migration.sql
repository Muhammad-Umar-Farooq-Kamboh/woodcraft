/*
  Warnings:

  - Added the required column `hours_of_construction` to the `Order_Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "unit" SET DEFAULT 0,
ALTER COLUMN "unit" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order_Item" ADD COLUMN     "hours_of_construction" INTEGER NOT NULL;
