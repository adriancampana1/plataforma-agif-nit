import { ModuleEntity } from '../entities/module.entity';
import { ReturnModuleDto } from './return-module.dto';

export class ReturnModulesDto {
  modules: ReturnModuleDto[];
  constructor(modules: ModuleEntity[]) {
    this.modules = modules.map((module) => new ReturnModuleDto(module));
  }
}
