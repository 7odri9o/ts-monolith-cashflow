import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { CreateCashOutDto } from './dto';

@Injectable()
export class CashOutRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateCashOutDto) {
    return this.databaseService.cashOut.create({
      data,
    });
  }
}
