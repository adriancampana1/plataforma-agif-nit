import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { CourseModule } from 'src/course/course.module';
import { ModuleRepository } from './repository/module.repository';

@Module({
  imports: [CourseModule],
  controllers: [ModuleController],
  providers: [ModuleService, ModuleRepository],
})
export class ModuleModule {}
