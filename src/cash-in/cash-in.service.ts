import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CashIn } from '@prisma/client';
import { WALLET_SERVICE } from '@/constants';
import { CreateCashInDto } from './dto';
import { CashInRepository } from './cash-in.repository';

@Injectable()
export class CashInService {
  constructor(
    @Inject(WALLET_SERVICE) private readonly walletClient: ClientProxy,
    private readonly cashInRepository: CashInRepository,
  ) {}

  async create(data: CreateCashInDto) {
    await this.cashInRepository.create(data);
  }

  async getTotalCashInByDate(date: string) {
    const cashInList = await this.cashInRepository.findByDate(date);
    return this.sumCashInValues(cashInList);
  }

  private sumCashInValues(list: CashIn[]): number {
    return list.reduce(
      (partial, cashIn) => partial + cashIn.value.toNumber(),
      0,
    );
  }
}
