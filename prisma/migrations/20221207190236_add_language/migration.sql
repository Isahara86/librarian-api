-- CreateTable
CREATE TABLE "BookLanguage"
(
    "bookId" INTEGER NOT NULL,
    "code"   TEXT    NOT NULL
);

-- CreateTable
CREATE TABLE "Language"
(
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookLanguage_bookId_code_key" ON "BookLanguage" ("bookId", "code");

-- AddForeignKey
ALTER TABLE "BookLanguage"
    ADD CONSTRAINT "BookLanguage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookLanguage"
    ADD CONSTRAINT "BookLanguage_code_fkey" FOREIGN KEY ("code") REFERENCES "Language" ("code") ON DELETE RESTRICT ON UPDATE CASCADE;
