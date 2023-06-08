import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { CreateCashInDto } from './dto';

@Injectable()
export class CashInRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateCashInDto) {
    return this.databaseService.cashIn.create({
      data,
    });
  }
}
