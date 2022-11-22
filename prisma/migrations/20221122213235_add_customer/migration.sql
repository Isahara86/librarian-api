-- CreateTable
CREATE TABLE "Customer"
(
    "id"    SERIAL NOT NULL,
    "email" TEXT,
    "name"  TEXT   NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer" ("email");
