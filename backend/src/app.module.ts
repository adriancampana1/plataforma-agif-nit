import { Module } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AddressModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
