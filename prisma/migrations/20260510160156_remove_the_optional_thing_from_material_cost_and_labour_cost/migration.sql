/*
  Warnings:

  - Made the column `labour_cost` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `material_cost` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "labour_cost" SET NOT NULL,
ALTER COLUMN "material_cost" SET NOT NULL;
