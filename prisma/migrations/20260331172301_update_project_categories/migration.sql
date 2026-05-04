-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'ThreeD';
ALTER TYPE "Category" ADD VALUE 'UI_UX';
ALTER TYPE "Category" ADD VALUE 'VideoEditing';
ALTER TYPE "Category" ADD VALUE 'ProxmoxVE';
ALTER TYPE "Category" ADD VALUE 'Docker';
ALTER TYPE "Category" ADD VALUE 'Nextcloud';
