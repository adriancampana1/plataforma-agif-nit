import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePartnerDto } from "../dto/create-partner.dto";
import { UpdatePartnerDto } from "../dto/update-partner.dto";

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

      async findAll() {
        return await this.prisma.partner.findMany({
          include: { address: true },
        });
      }

      async findOne(id: string) {
        return await this.prisma.partner.findUnique({ where: { id } });
      }

      async findOneByCommercialName(commercial_name: string) {
        return await this.prisma.partner.findMany({
          where: { commercial_name },
        });
      }

      async findOneByCorporateName(corporate_name: string) {
        return await this.prisma.partner.findMany({
          where: { corporate_name },
        });
      }

      async findBySearch(search: string) {
        return await this.prisma.partner.findMany({
          where: {
            OR: [
              {
                commercial_name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                corporate_name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        });
      }

      async update(id: string, updatePartnerDto: UpdatePartnerDto) {
        const { address, ...partnerData } = updatePartnerDto;
        return await this.prisma.partner.update({
          where: { id },
          data: {
            ...partnerData,
            address: {
              update: address,
            },
          },
        });
      }

      async remove(id: string) {
        return await this.prisma.partner.delete({
          where: { id },
          include: { address: true },
        });
      }
      
}