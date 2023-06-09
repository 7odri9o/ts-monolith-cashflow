import { Request, Response } from 'express';
import { catchError, map, of } from 'rxjs';
import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WALLET_SERVICE } from '@/constants';
import { JwtValidation } from '@/jwt';
import { CreateCashOutDto } from './dto';
import { CashOutService } from './cash-out.service';

@Controller('cash-out')
export class CashOutController {
  constructor(
    private readonly cashOutService: CashOutService,
    private readonly jwtValidation: JwtValidation,
    @Inject(WALLET_SERVICE) private readonly walletClient: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body() data: CreateCashOutDto,
    @Req() { cookies }: Request,
    @Res() response: Response,
  ) {
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

    await this.cashOutService.create(data);
    return this.walletClient
      .send('update_wallet', {
        operation: 'withdraw',
        transaction: {
          value: data.value,
          date: data.date,
        },
      })
      .pipe(
        map(() => response.end()),
        catchError(() => of(false)),
      );
  }
}
