-- AlterTable
ALTER TABLE "BookInventory"
    ADD COLUMN "deleteReason" TEXT,
    ADD COLUMN "deletedAt"    TIMESTAMPTZ(6);
