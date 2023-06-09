-- CreateTable
CREATE TABLE "cash_in" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" MONEY NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cash_in_pkey" PRIMARY KEY ("id")
);
