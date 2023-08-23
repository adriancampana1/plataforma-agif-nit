import { Module } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [UserModule, AddressModule, PrismaModule, AuthModule, CourseModule, PartnerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
