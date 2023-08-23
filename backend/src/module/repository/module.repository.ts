import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';

@Injectable()
export class ModuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.module.findMany();
  }

  async findByCourseId(courseId: string) {
    return await this.prisma.module.findMany({
      orderBy: {
        number: 'asc',
      },
      where: { courseId },
    });
  }

  async newModuleNumber() {
    const lastModule = await this.prisma.module.findFirst({
      orderBy: {
        number: 'desc',
      },
    });

    if (!lastModule) return 1;
    return lastModule.number + 1;
  }

  async create(createModuleDto: CreateModuleDto) {
    const { title, description, courseId, number } = createModuleDto;

    return await this.prisma.module.create({
      data: {
        title,
        description,
        number,
        Course: {
          connect: {
            id: courseId,
          },
        },
      },
    });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const { title, description } = updateModuleDto;

    return await this.prisma.module.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
  }

  async remove(id: string) {
    console.log('Deleting module');
    return await this.prisma.$transaction(async (prisma) => {
      //! TODO: Delete all classes from this module

      // Delete module
      const deletedModule = await prisma.module.delete({
        where: { id },
      });

      // Update modules numbers
      const modules = await prisma.module.findMany({
        where: { courseId: deletedModule.courseId },
      });

      for (let i = 0; i < modules.length; i++) {
        console.log('Updating module number', i + 1);
        await prisma.module.update({
          where: { id: modules[i].id },
          data: { number: i + 1 },
        });
      }

      return deletedModule;
    });
  }
}
