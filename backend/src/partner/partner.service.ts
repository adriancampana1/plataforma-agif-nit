import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerRepository } from './repository/partner.repository';


@Injectable()
export class PartnerService {
  constructor(private readonly partnerRepository: PartnerRepository) {}
  
  async create(createPartnerDto: CreatePartnerDto) {
    return await this.partnerRepository.create(createPartnerDto);
  }
  
  // create(createPartnerDto: CreatePartnerDto) {
  //   return 'This action adds a new partner';
  // }

  // findAll() {
  //   return `This action returns all partner`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} partner`;
  // }

  // update(id: number, updatePartnerDto: UpdatePartnerDto) {
  //   return `This action updates a #${id} partner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} partner`;
  // }
}
