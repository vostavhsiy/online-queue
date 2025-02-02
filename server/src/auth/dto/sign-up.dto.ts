import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Минимальная длина названия - 3 символа.' })
  name: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'Минимальная длина пароля - 5 символов.' })
  password: string;
}
