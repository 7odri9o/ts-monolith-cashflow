import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { parseListUtil } from '@/util';
import {
  AppConfig,
  AuthConfig,
  CacheConfig,
  DbConfig,
  Logging,
  MicroserviceConfig,
} from '@/config';

@Injectable()
export class ConfigService {
  readonly app: AppConfig;
  readonly auth: AuthConfig;
  readonly cache: CacheConfig;
  readonly db: DbConfig;
  readonly logging: Logging;
  readonly walletMs: MicroserviceConfig;

  constructor(nestConfigService: NestConfigService) {
    this.app = {
      port: parseInt(nestConfigService.getOrThrow('PORT'), 10),
    };

    this.auth = {
      jwtSecret: nestConfigService.getOrThrow('JWT_SECRET'),
      jwtExpiration: parseInt(nestConfigService.getOrThrow('JWT_EXPIRATION')),
    };

    this.db = {
      url: nestConfigService.getOrThrow('DATABASE_URL'),
    };

    this.cache = {
      url: nestConfigService.getOrThrow('REDIS_URL'),
      ttl: parseInt(nestConfigService.getOrThrow('CACHE_TTL'), 10),
    };

    this.walletMs = {
      host: nestConfigService.getOrThrow('WALLET_TCP_HOST'),
      port: parseInt(nestConfigService.getOrThrow('WALLET_TCP_PORT'), 10),
    };

    let logLevels = parseListUtil(nestConfigService.getOrThrow('LOG_LEVELS'));
    if (logLevels.length === 0) {
      logLevels = ['log'];
    }
    this.logging = {
      levels: logLevels.map((item) =>
        item === 'info' ? 'log' : item,
      ) as LogLevel[],
    };
  }
}
