import { Injectable } from '@nestjs/common';

import { CreateAddressDto } from './dto/create-address.dto';
import { AddressRepository } from './repository/address.repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.addressRepository.createAddress(createAddressDto);
  }
}
