import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(createAddressDto: CreateAddressDto) {
    return await this.prisma.address.create({
      data: createAddressDto,
    });
  }
}
