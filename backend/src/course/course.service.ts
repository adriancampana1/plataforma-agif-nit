import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { CourseRepository } from './repository/course.repository';
import { CourseEntity } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UserService } from 'src/user/user.service';
import { RemoveProfessorDto } from './dto/remove-professor.dto';
import { Role } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userService: UserService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseRepository.create(createCourseDto);
  }

  async findAll(): Promise<CourseEntity[]> {
    return await this.courseRepository.findAll();
  }

  async findOneById(id: string) {
    const course = await this.courseRepository.findOneById(id);

    const professors = [];
    for (const professor of course.CourseProfessor) {
      const user = await this.userService.findOneById(professor.professorId);
      professors.push(user);
    }

    return {
      course: course as CourseEntity,
      professors,
    };
  }

  async findBySearch(search: string): Promise<CourseEntity[]> {
    return await this.courseRepository.findBySearch(search);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  async addProfessor(id: string, createProfessorDto: CreateProfessorDto) {
    const professor = await this.userService.findOneByEmail(
      createProfessorDto.email,
    );

    if (professor.role !== Role.Professor) {
      throw new UnauthorizedException(
        'Only professors can be added to courses',
      );
    }

    return await this.courseRepository.addProfessor(id, professor.id);
  }

  async removeProfessor(
    courseId: string,
    deleteProfessorDto: RemoveProfessorDto,
  ) {
    const professor = await this.userService.findOneByEmail(
      deleteProfessorDto.email,
    );

    return await this.courseRepository.removeProfessor(courseId, professor.id);
  }

  async remove(id: string) {
    return await this.courseRepository.remove(id);
  }
}
