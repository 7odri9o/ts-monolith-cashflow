import { Injectable } from '@nestjs/common';
import { CashOut } from '@prisma/client';
import { CreateCashOutDto } from './dto';
import { CashOutRepository } from './cash-out.repository';

@Injectable()
export class CashOutService {
  constructor(private readonly cashOutRepository: CashOutRepository) {}

  async create(data: CreateCashOutDto) {
    return this.cashOutRepository.create(data);
  }

  async getTotalCashOutByDate(date: string) {
    const cashOutList = await this.cashOutRepository.findByDate(date);
    return this.sumCashOutValues(cashOutList);
  }

  private sumCashOutValues(list: CashOut[]): number {
    return list.reduce(
      (partial, cashOut) => partial + cashOut.value.toNumber(),
      0,
    );
  }
}
