import { Injectable } from '@nestjs/common';
import { WALLET_ID } from '@/constants';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async get() {
    return this.walletRepository.select(WALLET_ID);
  }
}
