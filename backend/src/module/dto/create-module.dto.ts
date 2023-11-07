import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  number: number;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
