/*
  Warnings:

  - You are about to drop the column `previewUrl` on the `Book` table. All the data in the column will be lost.

*/
ALTER TABLE "Book"
    RENAME COLUMN "previewUrl" TO "previewOrig";

ALTER TABLE "Book"
    ADD COLUMN "previewJpegThumbnail" TEXT,
    ADD COLUMN "previewJpeg"          TEXT,
    ADD COLUMN "previewWebp"          TEXT,
    ADD COLUMN "previewWebpThumbnail" TEXT;


