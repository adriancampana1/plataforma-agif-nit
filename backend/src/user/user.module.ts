import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';

import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AddressModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
