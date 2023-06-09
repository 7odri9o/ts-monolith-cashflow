import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { WALLET_ID } from '@/constants';
import { TransactionDto } from './dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  private logger = new Logger(WalletService.name);

  constructor(
    private readonly walletRepository: WalletRepository,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async get() {
    return this.walletRepository.select(WALLET_ID);
  }

  async withdraw(data: TransactionDto) {
    const result = await this.walletRepository.decrement(WALLET_ID, data);
    await this.cache('/wallet', result);
    return result;
  }

  async deposit(data: TransactionDto) {
    const result = await this.walletRepository.increment(WALLET_ID, data);
    await this.cache('/wallet', result);
    return result;
  }

  private async cache(key: string, data: any) {
    await this.cacheStore.del(key);
    await this.cacheStore.set(key, data);
    this.logger.debug(`${key} update on cache database`);
  }
}
