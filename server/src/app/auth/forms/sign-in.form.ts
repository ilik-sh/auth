import { IsEmail, IsString } from 'class-validator';

export class SignInForm {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
