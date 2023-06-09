-- CreateTable
CREATE TABLE "cash_out" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" MONEY NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cash_out_pkey" PRIMARY KEY ("id")
);
