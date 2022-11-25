-- DropForeignKey
ALTER TABLE "Book"
    DROP CONSTRAINT "Book_authorId_fkey";

-- AlterTable
ALTER TABLE "Book"
    ALTER COLUMN "authorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BookAuthor"
(
    "bookId"   INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookAuthor_bookId_authorId_key" ON "BookAuthor" ("bookId", "authorId");

-- AddForeignKey
ALTER TABLE "Book"
    ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor"
    ADD CONSTRAINT "BookAuthor_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthor"
    ADD CONSTRAINT "BookAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
