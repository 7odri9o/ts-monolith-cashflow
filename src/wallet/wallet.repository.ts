import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database';

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
}
