import { Response } from 'express';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.auth.jwtExpiration,
    );

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.auth.jwtSecret,
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
