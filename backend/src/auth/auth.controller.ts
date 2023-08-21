import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ReturnAuthDto } from './dto/return-auth.dto';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ReturnAuthDto> {
    return new ReturnAuthDto(await this.authService.register(registerDto));
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnAuthDto> {
    return new ReturnAuthDto(await this.authService.login(loginDto));
  }
}
