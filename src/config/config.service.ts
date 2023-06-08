import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { parseListUtil } from '@/util';
import { AppConfig, AuthConfig, DbConfig, Logging } from '@/config';

@Injectable()
export class ConfigService {
  readonly app: AppConfig;
  readonly auth: AuthConfig;
  readonly db: DbConfig;
  readonly logging: Logging;

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
