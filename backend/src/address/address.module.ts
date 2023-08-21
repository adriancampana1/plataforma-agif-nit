import { Module } from '@nestjs/common';

import { AddressService } from './address.service';
import { AddressRepository } from './repository/address.repository';

@Module({
  providers: [AddressService, AddressRepository],
  exports: [AddressService],
})
export class AddressModule {}
