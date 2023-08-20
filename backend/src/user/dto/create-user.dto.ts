import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsOptional()
  @IsNumber()
  role?: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
