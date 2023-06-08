import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { parseListUtil } from '@/util';
import { AppConfig, Logging } from '@/config';

@Injectable()
export class ConfigService {
  readonly app: AppConfig;
  readonly logging: Logging;

  constructor(nestConfigService: NestConfigService) {
    this.app = {
      port: parseInt(nestConfigService.getOrThrow('PORT'), 10),
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
