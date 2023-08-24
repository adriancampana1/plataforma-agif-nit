import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { address, ...user } = createUserDto;

    return await this.prisma.user.create({
      data: {
        ...user,
        address: {
          create: address,
        },
      },
      include: { address: true },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: { address: true },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: { address: true },
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
