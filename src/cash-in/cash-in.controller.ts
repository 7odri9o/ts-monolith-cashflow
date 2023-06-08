import { Request } from 'express';
import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCashInDto } from './dto';
import { JwtValidation } from '@/jwt';
import { CashInService } from './cash-in.service';

@Controller('cash-in')
export class CashInController {
  constructor(
    private readonly cashInService: CashInService,
    private readonly jwtValidation: JwtValidation,
  ) {}

  @Post()
  async create(@Body() data: CreateCashInDto, @Req() { cookies }: Request) {
    const jwt = cookies.Authentication;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    const user = await this.jwtValidation.getUserFromAuth(
      cookies.Authentication,
    );
    if (!user) {
      throw new ForbiddenException();
    }

    return this.cashInService.create(data);
  }
}
