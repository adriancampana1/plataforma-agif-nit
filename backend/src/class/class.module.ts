import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './repository/class.repository';

@Module({
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}
