import * as dateFns from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { CashInService } from '@/cash-in';
import { CashOutService } from '@/cash-out';
import { ConfigService } from '@/config';
import { GetBalanceDto } from './dto';
import { Balance } from './entities';

@Injectable()
export class BalanceService {
  constructor(
    private readonly cashInService: CashInService,
    private readonly cashOutService: CashOutService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,
  ) {}

  async get(params: GetBalanceDto): Promise<Balance> {
    const balanceFromCache = await this.getBalanceFromCache(params);
    if (!balanceFromCache) {
      const balanceFromDb = await this.getBalanceFromDb(params);
      await this.setBalanceOnCache(balanceFromDb);
      return balanceFromDb;
    }

    return balanceFromCache;
  }

  private async getBalanceFromCache(params: GetBalanceDto): Promise<Balance> {
    const cacheKey = this.getCacheKey(params);
    return this.cacheStore.get<Balance>(cacheKey);
  }

  private async getBalanceFromDb(params: GetBalanceDto): Promise<Balance> {
    const balanceDate = this.getBalanceDate(params);
    const cashIn = await this.cashInService.getTotalCashInByDate(balanceDate);
    const cashOut = await this.cashOutService.getTotalCashOutByDate(
      balanceDate,
    );
    const balance = this.calculateBalanceValue(cashIn, cashOut);
    return {
      date: balanceDate,
      cashIn: cashIn.toFixed(2),
      cashOut: cashOut.toFixed(2),
      balance,
    };
  }

  private async setBalanceOnCache(balance: Balance): Promise<void> {
    const timeToLive = this.configService.cache.ttl;
    return this.cacheStore.set(`/balance/${balance.date}`, balance, timeToLive);
  }

  private getCacheKey(params: GetBalanceDto): string {
    return `/balance/${params.date}`;
  }

  private calculateBalanceValue(cashIn: number, cashOut: number): string {
    const balance = cashIn - cashOut;
    return balance.toFixed(2);
  }

  private getBalanceDate(params: GetBalanceDto): string {
    if (!params.date) {
      return dateFns.format(new Date(), 'yyyy-MM-dd');
    }
    return params.date;
  }
}
