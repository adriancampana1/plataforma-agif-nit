import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleRepository } from './repository/module.repository';
import { ModuleEntity } from './entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    private readonly courseService: CourseService,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    createModuleDto.number = await this.moduleRepository.newModuleNumber(
      createModuleDto.courseId,
    );
    return await this.moduleRepository.create(createModuleDto);
  }

  async findAll() {
    return await this.moduleRepository.getAll();
  }

  async findOneById(id: string) {
    return (await this.moduleRepository.findOneById(id)) as ModuleEntity;
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
