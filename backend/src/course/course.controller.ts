import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { RemoveProfessorDto } from './dto/remove-professor.dto';
import { ReturnCourseDto } from './dto/return-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(new RoleGuard(['Professor']))
  async create(@Body() createCourseDto: CreateCourseDto) {
    return new ReturnCourseDto(
      await this.courseService.create(createCourseDto),
    );
  }

  @Post('professor/:id')
  @UseGuards(new RoleGuard(['Professor']))
  async addProfessor(
    @Param('id') id: string,
    @Body() createProfessorDto: CreateProfessorDto,
  ) {
    if (!id) {
      throw new BadRequestException('courseId is required');
    }
    return await this.courseService.addProfessor(id, createProfessorDto);
  }

  @Get()
  async findAll(): Promise<ReturnCourseDto[]> {
    const courses = await this.courseService.findAll();
    return courses.map((course) => new ReturnCourseDto(course));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const { course, professors } = await this.courseService.findOneById(id);
    const professorNames = professors.map((professor) => professor.username);

    return {
      ...new ReturnCourseDto(course),
      professors: professorNames,
    };
  }

  @Get('search/:search')
  async findBySearch(
    @Param('search') search: string,
  ): Promise<ReturnCourseDto[]> {
    const courses = await this.courseService.findBySearch(search);
    return courses.map((course) => new ReturnCourseDto(course));
  }

  @Patch(':id')
  @UseGuards(new RoleGuard(['Professor']))
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    if (!id) {
      throw new BadRequestException('courseId is required');
    }
    return new ReturnCourseDto(
      await this.courseService.update(id, updateCourseDto),
    );
  }

  @Delete('professor/:id')
  @UseGuards(new RoleGuard(['Professor']))
  async removeProfessor(
    @Param('id') courseId: string,
    @Body() removeProfessorDto: RemoveProfessorDto,
  ) {
    console.log(courseId);

    if (!courseId) {
      throw new BadRequestException('courseId is required');
    }

    return await this.courseService.removeProfessor(
      courseId,
      removeProfessorDto,
    );
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(['Professor']))
  async remove(@Param('id') id: string) {
    return new ReturnCourseDto(await this.courseService.remove(id));
  }
}
