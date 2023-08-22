import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProfessorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
