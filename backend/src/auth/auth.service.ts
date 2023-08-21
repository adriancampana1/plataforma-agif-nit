import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const findUser = await this.usersService.findOneByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (findUser.password !== password) {
      throw new Error('Wrong password');
    }

    const payload = { email, sub: findUser.id };
    return {
      ...findUser,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    const user = await this.usersService.create(registerDto);
    return {
      ...user,
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }
}
