import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthEntity } from './entity/auth.entity';
import { jwtConstants } from './jwt/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user);
    return { user, ...tokens };
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create(registerDto);
    const tokens = await this.getTokens(user);
    return { user, ...tokens };
  }

  async refresh(refresh_token: string): Promise<AuthEntity> {
    const { sub } = this.jwtService.verify(refresh_token, {
      secret: jwtConstants.secret,
    });
    const user = await this.usersService.findOneById(sub);
    const tokens = await this.getTokens(user);
    return { ...tokens };
  }

  private async getTokens(user: UserEntity) {
    const payload = { role: user.role, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.refreshExpiresIn,
      }),
    };
  }
}
