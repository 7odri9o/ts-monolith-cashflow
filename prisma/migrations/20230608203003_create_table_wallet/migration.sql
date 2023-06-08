-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "value" MONEY NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);
