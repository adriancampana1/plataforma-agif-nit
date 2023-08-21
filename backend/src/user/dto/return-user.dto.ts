import { ReturnAddressDto } from 'src/address/dto/return-address.dto';

export class ReturnUserDto {
  id?: number;
  role?: number;
  username: string;
  email: string;
  password: string;
  address?: ReturnAddressDto;

  constructor(user: any) {
    this.id = user.id;
    this.role = user.role;
    this.username = user.username;
    this.email = user.email;
    this.address = user.address
      ? new ReturnAddressDto(user.address)
      : undefined;
  }
}
