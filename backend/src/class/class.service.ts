import { Injectable } from '@nestjs/common';

import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRepository } from './repository/class.repository';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async create(createClassDto: CreateClassDto) {
    createClassDto.number = await this.classRepository.newClassNumber(
      createClassDto.moduleId,
    );
    return this.classRepository.create(createClassDto);
  }

  async findAll() {
    return await this.classRepository.findAll();
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return await this.classRepository.update(id, updateClassDto);
  }

  async remove(id: string) {
    return await this.classRepository.remove(id);
  }
}
