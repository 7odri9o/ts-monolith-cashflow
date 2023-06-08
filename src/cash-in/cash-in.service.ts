import { Injectable } from '@nestjs/common';
import { CashInRepository } from './cash-in.repository';
import { CreateCashInDto } from './dto';

@Injectable()
export class CashInService {
  constructor(private readonly cashInRepository: CashInRepository) {}

  async create(data: CreateCashInDto) {
    return this.cashInRepository.create(data);
  }
}
