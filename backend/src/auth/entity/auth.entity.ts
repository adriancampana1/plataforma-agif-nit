import { UserEntity } from 'src/user/entity/user.entity';

export class AuthEntity extends UserEntity {
  access_token: string;
}
