import { ReturnUserDto } from 'src/user/dto/return-user.dto';

import { AuthEntity } from '../entity/auth.entity';

export class ReturnAuthDto {
  user: ReturnUserDto;
  access_token?: string;
  refresh_token?: string;

  constructor(authEntity: AuthEntity) {
    this.user = authEntity.user
      ? new ReturnUserDto(authEntity.user)
      : undefined;
    this.access_token = authEntity.access_token;
    this.refresh_token = authEntity.refresh_token;
  }
}
