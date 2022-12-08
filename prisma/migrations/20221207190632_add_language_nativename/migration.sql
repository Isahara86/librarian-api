/*
  Warnings:

  - Added the required column `nativeName` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language"
    ADD COLUMN "nativeName" TEXT NOT NULL;
