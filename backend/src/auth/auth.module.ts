import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtStrategy } from './jwt/refresh.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.accessExpiresIn },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
