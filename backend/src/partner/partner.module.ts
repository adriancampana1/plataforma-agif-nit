import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PartnerRepository } from './repository/partner.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
})
export class PartnerModule {}
