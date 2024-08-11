/*
  Warnings:

  - You are about to drop the column `comment` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "comment",
DROP COLUMN "delivery",
ADD COLUMN     "address" JSONB;
