import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { CreateUserDto, GetUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateUserDto) {
    return this.databaseService.user.create({
      data,
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.databaseService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(params: GetUserDto) {
    return this.databaseService.user.findUnique({
      where: {
        id: params.id,
      },
    });
  }
}
