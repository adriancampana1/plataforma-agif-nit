import { Prisma } from '@prisma/client';

export class CourseEntity implements Prisma.CourseUncheckedCreateInput {
  id?: string;
  title: string;
  description: string;
  tags?: Prisma.CourseCreatetagsInput | string[];
  classesCount?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  CourseProfessor?: Prisma.CourseProfessorUncheckedCreateNestedManyWithoutCourseInput;
}
