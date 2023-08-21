import { AuthEntity } from '../entity/auth.entity';

export class ReturnAuthDto {
  role?: number;
  username: string;
  email: string;
  addressId?: number;
  access_token?: string;

  constructor(authEntity: AuthEntity) {
    this.role = authEntity.role;
    this.username = authEntity.username;
    this.email = authEntity.email;
    this.addressId = authEntity.addressId;
    this.access_token = authEntity.access_token;
  }
}
