import { IsEmail, IsString } from 'class-validator';

export class SignUpForm {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
