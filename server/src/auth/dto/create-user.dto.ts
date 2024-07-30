import { IsString } from 'class-validator'
import { UserEntity } from '../entities/user.entity'

export class CreateUserDto extends UserEntity {
  @IsString()
  name: string

  @IsString()
  surname: string

  @IsString()
  email: string

  @IsString()
  password: string
}
