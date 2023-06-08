import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users';

@Injectable()
export class JwtValidation {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async getUserFromAuth(authentication: string) {
    const decoded = this.jwtService.decode(authentication);
    const user = await this.usersService.getUser({ id: decoded['userId'] });
    if (!user) {
      return null;
    }

    return user;
  }
}
