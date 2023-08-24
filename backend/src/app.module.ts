import { Module } from '@nestjs/common';

import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    UserModule,
    AddressModule,
    PrismaModule,
    AuthModule,
    CourseModule,
    ModuleModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
