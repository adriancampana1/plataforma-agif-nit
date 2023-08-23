import { Prisma } from '@prisma/client';

export class PartnerEntity implements Prisma.PartnerUncheckedCreateInput {
    id?: string;
    addressId: string;
    corporate_name: string;
    commercial_name: string;
    cnpj: string;
    representative: string;
    signature: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  
}
