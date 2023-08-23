-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "corporate_name" TEXT NOT NULL,
    "commercial_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
