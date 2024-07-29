import { IsString } from 'class-validator'
import { UserEntity } from '../entities/user.entity'

export class CreateUserDto extends UserEntity {
  @IsString()
  email: string

  @IsString()
  password: string
}
