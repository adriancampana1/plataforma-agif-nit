import { $Enums, Prisma } from '@prisma/client';

export class UserEntity implements Prisma.UserUncheckedCreateInput {
  id?: string;
  addressId: string;
  role?: $Enums.Role;
  username: string;
  email: string;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
