import { Request } from 'express';
import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtValidation } from '@/jwt';
import { CreateCashOutDto } from './dto';
import { CashOutService } from './cash-out.service';

@Controller('cash-out')
export class CashOutController {
  constructor(
    private readonly cashOutService: CashOutService,
    private readonly jwtValidation: JwtValidation,
  ) {}

  @Post()
  async create(@Body() data: CreateCashOutDto, @Req() { cookies }: Request) {
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

    return this.cashOutService.create(data);
  }
}
