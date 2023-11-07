import { $Enums, Prisma } from '@prisma/client';

export class ClassEntity implements Prisma.ClassCreateWithoutModuleInput {
  id?: string;
  title: string;
  description: string;
  type: $Enums.ClassType;
  content: string;
  number: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
