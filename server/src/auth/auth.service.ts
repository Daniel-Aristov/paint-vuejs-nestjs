import { Injectable, NotFoundException } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserById(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.databaseService.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.password !== password) {
      throw new NotFoundException('Invalid password')
    }

    return user
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return await this.databaseService.user.create({
      data: createUserDto,
    })
  }
}
