import { Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepository.create(createUserDto);
    return new ReturnUserDto(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users.map((user) => new ReturnUserDto(user));
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }
}
