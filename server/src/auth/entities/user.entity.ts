import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
