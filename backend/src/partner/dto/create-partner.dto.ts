import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreatePartnerDto implements Prisma.PartnerCreateWithoutAddressInput {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    corporate_name: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    commercial_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(14)    
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    representative: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    signature: string;
}

