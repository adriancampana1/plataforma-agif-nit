import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { address, ...user } = createUserDto;

    user.password = await bcrypt.hash(user.password, 10);
    return await this.prisma.user.create({
      data: {
        ...user,
        address: {
          create: address,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: { address: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { address, ...userData } = updateUserDto;
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        address: {
          update: address,
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
      include: { address: true },
    });
  }
}
