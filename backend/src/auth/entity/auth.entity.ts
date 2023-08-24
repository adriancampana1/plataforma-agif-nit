import { UserEntity } from 'src/user/entity/user.entity';

export class AuthEntity {
  user?: UserEntity;
  access_token: string;
  refresh_token: string;
}
