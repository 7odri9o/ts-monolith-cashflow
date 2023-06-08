import * as Transport from 'winston-transport';
import { LoggerService } from '@nestjs/common';
import { WinstonConstants } from './winston.constants';

const LEVEL = WinstonConstants.LEVEL;

export class NestTransport extends Transport {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  log(info: any, callback: () => void) {
    const { context, message, [LEVEL]: level } = info;

    switch (level) {
      case 'silly':
      case 'data':
      case 'debug':
        if (this.logger.debug) {
          this.logger.debug(message, context);
        }
        break;
      case 'http':
      case 'verbose':
        if (this.logger.verbose) {
          this.logger.verbose(message, context);
        }
        break;
      case 'help':
      case 'prompt':
      case 'input':
      case 'notice':
      case 'info':
        this.logger.log(message, context);
        break;
      case 'warning':
      case 'warn':
        this.logger.warn(message, context);
        break;
      case 'alert':
      case 'emerg':
      case 'crit':
      case 'error':
        this.logger.error(message, context);
        break;
      default:
        this.logger.warn(`Unexpected log level: ${level}`, context);
        this.logger.warn(message, context);
        break;
    }

    callback();
  }
}
