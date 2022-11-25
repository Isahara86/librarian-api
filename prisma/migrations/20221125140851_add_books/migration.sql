-- CreateTable
CREATE TABLE "Book"
(
    "id"         SERIAL  NOT NULL,
    "name"       TEXT    NOT NULL,
    "authorId"   INTEGER NOT NULL,
    "previewUrl" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author"
(
    "id"   SERIAL NOT NULL,
    "name" TEXT   NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookInventory"
(
    "id"           SERIAL  NOT NULL,
    "bookId"       INTEGER NOT NULL,
    "serialNumber" TEXT    NOT NULL,

    CONSTRAINT "BookInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryReservation"
(
    "id"         SERIAL  NOT NULL,
    "createdAt"  TIMESTAMPTZ(6),
    "startAt"    TIMESTAMPTZ(6),
    "endAt"      TIMESTAMPTZ(6),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "InventoryReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category"
(
    "id"   SERIAL NOT NULL,
    "name" TEXT   NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookCategory"
(
    "bookId"     INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookCategory_bookId_categoryId_key" ON "BookCategory" ("bookId", "categoryId");

-- AddForeignKey
ALTER TABLE "Book"
    ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInventory"
    ADD CONSTRAINT "BookInventory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryReservation"
    ADD CONSTRAINT "InventoryReservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory"
    ADD CONSTRAINT "BookCategory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategory"
    ADD CONSTRAINT "BookCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
