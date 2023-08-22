import { Module } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [UserModule, AddressModule, PrismaModule, AuthModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
