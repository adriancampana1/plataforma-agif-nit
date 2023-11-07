import { 
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ReturnPartnerDto } from './dto/return-partner.dto';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    return new ReturnPartnerDto(
      await this.partnerService.create(createPartnerDto)
    );
  }

  @Get()
  async findAll(): Promise<ReturnPartnerDto[]> {
    const partners = await this.partnerService.findAll();
    return partners.map((partner) => new ReturnPartnerDto(partner));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return new ReturnPartnerDto (await this.partnerService.findOneById(id));
  }

  @Get('search/:search')
  async findBySearch(
    @Param('search') search: string,
  ): Promise<ReturnPartnerDto[]> {
    console.log(search);
    const partners = await this.partnerService.findBySearch(search);
    return partners.map((partner) => new ReturnPartnerDto(partner));
  }
  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    if (!id) {
      throw new BadRequestException('partnerId is required');
    }
    return new ReturnPartnerDto(
      await this.partnerService.update(id, updatePartnerDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ReturnPartnerDto(await this.partnerService.remove(id));
  }
}
