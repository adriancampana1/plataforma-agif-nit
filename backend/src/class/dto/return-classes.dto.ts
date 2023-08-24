import { ClassEntity } from '../entities/class.entity';
import { ReturnClassDto } from './return-class.dto';

export class ReturnClassesDto {
  classes: ReturnClassDto[];

  constructor(classesEntity: ClassEntity[]) {
    this.classes = classesEntity.map(
      (classEntity) => new ReturnClassDto(classEntity),
    );
  }
}
