/*
  Warnings:

  - Made the column `createdAt` on table `InventoryReservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startAt` on table `InventoryReservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endAt` on table `InventoryReservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InventoryReservation" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "startAt" SET NOT NULL,
ALTER COLUMN "endAt" SET NOT NULL;
