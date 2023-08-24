import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateModuleDto } from './dto/create-module.dto';
import { ReturnModuleDto } from './dto/return-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto) {
    return new ReturnModuleDto(
      await this.moduleService.create(createModuleDto),
    );
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return new ReturnModuleDto(await this.moduleService.findOneById(id));
  }

  @Get('course/:id')
  async findOne(@Param('id') courseId: string) {
    const modules = await this.moduleService.findByCourseID(courseId);
    return modules.map((module) => new ReturnModuleDto(module));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return new ReturnModuleDto(
      await this.moduleService.update(id, updateModuleDto),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}