import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerRepository } from './repository/partner.repository';
import { PartnerEntity } from './entities/partner.entity';


@Injectable()
export class PartnerService {
  constructor(private readonly partnerRepository: PartnerRepository) {}

  async create(createPartnerDto: CreatePartnerDto) {
    return await this.partnerRepository.create(createPartnerDto);
  }

  async findAll(): Promise<PartnerEntity[]> {
    return await this.partnerRepository.findAll();
  }

  async findOneById(id: string) {
    return await this.partnerRepository.findOne(id);
  }

  async findOneByCorporateName(corporate_name: string): Promise<PartnerEntity[]> {
    return await this.partnerRepository.findOneByCorporateName(corporate_name);
  }

  async findOneByCommercialName(commercial_name: string): Promise<PartnerEntity[]> {
    return await this.partnerRepository.findOneByCommercialName(commercial_name);
  }

  async findBySearch(search: string): Promise<PartnerEntity[]> {
    return await this.partnerRepository.findBySearch(search);
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    return await this.partnerRepository.update(id, updatePartnerDto);
  }

  async remove(id: string) {
    return await this.partnerRepository.remove(id);
  }

}
