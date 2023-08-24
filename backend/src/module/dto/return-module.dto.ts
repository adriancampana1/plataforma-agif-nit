import { ClassEntity } from 'src/class/entities/class.entity';
import { ModuleEntity } from '../entities/module.entity';
import { ReturnClassesDto } from 'src/class/dto/return-classes.dto';

export class ReturnModuleDto {
  id: string;
  title: string;
  description: string;
  number: number;
  classes: ClassEntity[];

  constructor(module: ModuleEntity) {
    this.id = module.id;
    this.title = module.title;
    this.description = module.description;
    this.number = module.number;
    this.classes = module.Classes
      ? new ReturnClassesDto(module.Classes as ClassEntity[]).classes
      : null;
  }
}
