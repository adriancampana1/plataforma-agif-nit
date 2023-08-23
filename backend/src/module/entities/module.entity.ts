import { Prisma } from '@prisma/client';

export class ModuleEntity implements Prisma.ModuleUncheckedCreateInput {
  id?: string;
  title: string;
  description: string;
  number: number;
  courseId: string;
}
