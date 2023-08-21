import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  number: number;

  @IsString()
  @IsNotEmpty()
  complement: string;
}
