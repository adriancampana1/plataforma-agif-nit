import { ReturnModuleDto } from 'src/module/dto/return-module.dto';
import { ReturnModulesDto } from 'src/module/dto/return-modules.dto';
import { ModuleEntity } from 'src/module/entities/module.entity';

import { CourseEntity } from '../entities/course.entity';

export class ReturnCourseDto {
  id?: string;
  title: string;
  description: string;
  tags?: string[];
  classesCount?: number;
  modules?: ReturnModuleDto[];

  constructor(course: CourseEntity) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.tags = course.tags as string[];
    this.classesCount = course.classesCount;
    this.modules = course.Modules
      ? new ReturnModulesDto(course.Modules as ModuleEntity[]).modules
      : undefined;
  }
}
