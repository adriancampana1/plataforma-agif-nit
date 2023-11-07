import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findOneById(id: string) {
    return await this.prisma.course.findUnique({
      where: { id },
      include: {
        CourseProfessor: true,
        Modules: {
          orderBy: {
            number: 'asc',
          },
        },
      },
    });
  }

  async findBySearch(search: string) {
    return await this.prisma.course.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async addProfessor(courseId: string, professorId: string) {
    return await this.prisma.courseProfessor.create({
      data: {
        courseId,
        professorId,
      },
    });
  }

  async removeProfessor(courseId: string, professorId: string) {
    return await this.prisma.courseProfessor.deleteMany({
      where: {
        courseId: courseId,
        professorId: professorId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
