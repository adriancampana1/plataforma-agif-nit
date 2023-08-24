import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from '../dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';

@Injectable()
export class ClassRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.class.findMany();
  }

  async newClassNumber(moduleId: string) {
    const lastClass = await this.prisma.class.findFirst({
      where: { moduleId },
      orderBy: {
        number: 'desc',
      },
    });

    if (!lastClass) return 1;
    return lastClass.number + 1;
  }

  async create(createClassDto: CreateClassDto) {
    const { title, description, content, type, number, moduleId } =
      createClassDto;

    return this.prisma.class.create({
      data: {
        title,
        description,
        content,
        type,
        number,
        Module: {
          connect: {
            id: moduleId,
          },
        },
      },
    });
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const { title, description, content, type } = updateClassDto;

    return await this.prisma.class.update({
      where: { id },
      data: {
        title,
        description,
        content,
        type,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.$transaction(async (prisma) => {
      const deletedClass = await prisma.class.delete({
        where: { id },
      });

      const classes = await prisma.class.findMany({
        where: { moduleId: deletedClass.moduleId },
      });

      for (let i = 0; i < classes.length; i++) {
        await prisma.class.update({
          where: { id: classes[i].id },
          data: {
            number: i + 1,
          },
        });
      }

      return deletedClass;
    });
  }
}
