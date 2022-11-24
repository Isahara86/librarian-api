-- CreateTable
CREATE TABLE "Admin"
(
    "id"           SERIAL NOT NULL,
    "login"        TEXT   NOT NULL,
    "name"         TEXT   NOT NULL,
    "password"     TEXT   NOT NULL,
    "passwordSalt" TEXT   NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_login_key" ON "Admin" ("login");
