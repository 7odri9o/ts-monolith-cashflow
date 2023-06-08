import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '@/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return await this.usersService.verifyUser(email, password);
  }
}
