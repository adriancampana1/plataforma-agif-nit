import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePartnerDto } from "../dto/create-partner.dto";

@Injectable()
export class PartnerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(createPartnerDto: CreatePartnerDto) {
        const { address, ...partner } = createPartnerDto;
    
        return await this.prisma.partner.create({
          data: {
            ...partner,
            address: {
              create: address,
            },
          },
        });
      }
}