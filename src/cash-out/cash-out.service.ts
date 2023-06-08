import { Injectable } from '@nestjs/common';
import { CreateCashOutDto } from './dto';
import { CashOutRepository } from './cash-out.repository';

@Injectable()
export class CashOutService {
  constructor(private readonly cashOutRepository: CashOutRepository) {}

  async create(data: CreateCashOutDto) {
    return this.cashOutRepository.create(data);
  }
}
