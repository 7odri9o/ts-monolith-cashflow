import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';
import { TransactionDto } from './dto';

@Injectable()
export class WalletRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async select(id: string) {
    return this.databaseService.wallet.findUnique({
      select: {
        date: true,
        value: true,
        updatedAt: true,
      },
      where: {
        id,
      },
    });
  }

  async decrement(id: string, data: TransactionDto) {
    return this.databaseService.wallet.update({
      data: {
        value: {
          decrement: data.value,
        },
        date: data.date,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async increment(id: string, data: TransactionDto) {
    return this.databaseService.wallet.update({
      data: {
        value: {
          increment: data.value,
        },
        date: data.date,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
