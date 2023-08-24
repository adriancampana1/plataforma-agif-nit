import { $Enums } from '@prisma/client';
import { ClassEntity } from '../entities/class.entity';

export class ReturnClassDto {
  id?: string;
  title: string;
  description: string;
  type: $Enums.ClassType;
  content: string;
  number: number;

  constructor(classEntity: ClassEntity) {
    this.id = classEntity.id;
    this.title = classEntity.title;
    this.description = classEntity.description;
    this.type = classEntity.type;
    this.content = classEntity.content;
    this.number = classEntity.number;
  }
}
