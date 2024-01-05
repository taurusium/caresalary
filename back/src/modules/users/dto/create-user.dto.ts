import { IsEmail, IsEnum, IsString } from 'class-validator';

enum UserRole {
  EMPLOYER = 'Employer',
  EMPLOYEE = 'Employee',
  EMPLOYER_AND_EMPLOYEE = 'EmployerAndEmployee',
}
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;
}
