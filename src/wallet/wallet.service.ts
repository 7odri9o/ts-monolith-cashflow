import { Injectable } from '@nestjs/common';
import { WALLET_ID } from '@/constants';
import { TransactionDto } from './dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async get() {
    return this.walletRepository.select(WALLET_ID);
  }

  async withdraw(data: TransactionDto) {
    return this.walletRepository.decrement(WALLET_ID, data);
  }

  async deposit(data: TransactionDto) {
    return this.walletRepository.increment(WALLET_ID, data);
  }
}
