import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  Employer = 'Employer',
  Employee = 'Employee',
  EmployerAndEmployee = 'EmployerAndEmployee',
}
export class User {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;
}
