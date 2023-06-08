import { User } from '@prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators';
import { JwtAuthGuard } from '@/guards';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    delete user['password'];
    return user;
  }
}
