import { Request } from 'express';
import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtValidation } from '@/jwt';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly jwtValidation: JwtValidation,
  ) {}

  @Get()
  async get(@Req() { cookies }: Request) {
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

    return this.walletService.get();
  }

  @MessagePattern('update_wallet')
  @UsePipes(new ValidationPipe())
  async update(@Payload() data: UpdateWalletDto) {
    return this.walletService[data.operation](data.transaction);
  }
}
