import { ReturnAddressDto } from 'src/address/dto/return-address.dto';

export class ReturnUserDto {
  role?: number;
  username: string;
  email: string;
  address?: ReturnAddressDto;

  constructor(user: any) {
    this.role = user.role;
    this.username = user.username;
    this.email = user.email;
    this.address = user.address
      ? new ReturnAddressDto(user.address)
      : undefined;
  }
}
