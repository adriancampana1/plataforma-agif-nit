import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleRepository } from './repository/module.repository';

@Injectable()
export class ModuleService {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly courseService: CourseService,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    createModuleDto.number = await this.moduleRepository.newModuleNumber();
    return await this.moduleRepository.create(createModuleDto);
  }

  async findAll() {
    return await this.moduleRepository.getAll();
  }

  async findByCourseID(id: string) {
    return await this.moduleRepository.findByCourseId(id);
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    return await this.moduleRepository.update(id, updateModuleDto);
  }

  async remove(id: string) {
    return await this.moduleRepository.remove(id);
  }
}
