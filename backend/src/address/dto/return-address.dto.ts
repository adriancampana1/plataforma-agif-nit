import { CreateAddressDto } from './create-address.dto';

export class ReturnAddressDto {
  zip: string;
  number: number;
  complement: string;

  constructor(address: CreateAddressDto) {
    this.zip = address.zip;
    this.number = address.number;
    this.complement = address.complement;
  }
}
