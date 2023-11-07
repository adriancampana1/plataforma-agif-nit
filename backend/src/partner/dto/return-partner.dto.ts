import { ReturnAddressDto } from 'src/address/dto/return-address.dto';
import { PartnerEntity } from '../entities/partner.entity';

export class ReturnPartnerDto {
  id?: string;
  corporate_name: string;
  commercial_name: string;
  cnpj: string;
  representative: string;
  signature: string;
  address?: ReturnAddressDto;

  constructor(partner: PartnerEntity) {
    this.id = partner.id;
    this.corporate_name = partner.corporate_name;
    this.commercial_name = partner.commercial_name;
    this.cnpj = partner.cnpj;
    this.representative = partner.representative;
    this.signature = partner.signature;
  }
}
