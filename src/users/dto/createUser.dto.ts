import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password at least has 8 characters, one letter and one number',
  })
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullname: string;
}
