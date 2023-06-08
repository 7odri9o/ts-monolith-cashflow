import { Request } from 'express';
import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtValidation } from '@/jwt';
import { GetBalanceDto } from './dto';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(
    private readonly jwtValidation: JwtValidation,
    private readonly balanceService: BalanceService,
  ) {}

  @Get()
  async get(@Query() params: GetBalanceDto, @Req() { cookies }: Request) {
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

    return this.balanceService.get(params);
  }
}
