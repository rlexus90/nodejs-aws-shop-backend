-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "payment" JSONB,
    "delivery" JSONB,
    "comments" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "total" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
