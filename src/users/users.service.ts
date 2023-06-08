import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    return this.usersRepository.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  async getUser(params: GetUserDto) {
    const user = await this.usersRepository.findById(params);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
