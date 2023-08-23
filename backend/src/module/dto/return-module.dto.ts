import { ModuleEntity } from '../entities/module.entity';

export class ReturnModuleDto {
  id: string;
  title: string;
  description: string;
  number: number;

  constructor(module: ModuleEntity) {
    this.id = module.id;
    this.title = module.title;
    this.description = module.description;
    this.number = module.number;
  }
}
