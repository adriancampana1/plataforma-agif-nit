import { $Enums } from '@prisma/client';
import { AuthEntity } from '../entity/auth.entity';

export class ReturnAuthDto {
  role?: $Enums.Role;
  username: string;
  email: string;
  addressId?: string;
  access_token?: string;

  constructor(authEntity: AuthEntity) {
    this.role = authEntity.role;
    this.username = authEntity.username;
    this.email = authEntity.email;
    this.addressId = authEntity.addressId;
    this.access_token = authEntity.access_token;
  }
}
