import { Prisma } from '@prisma/client';

export class UserEntity implements Prisma.UserUncheckedCreateInput {
  id?: number;
  addressId: number;
  role?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
