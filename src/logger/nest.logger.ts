import { Logger } from '@nestjs/common';
import { ILoggerService } from './logger.interface';

export class NestLogger implements ILoggerService {
  private logger = new Logger();

  debug(context: string, message: string, params: any[]): void {
    this.logger.debug(message, ...params, context);
  }

  verbose(context: string, message: string, params: any[]): void {
    this.logger.verbose(message, ...params, context);
  }

  log(context: string, message: string, params: any[]): void {
    this.logger.log(message, ...params, context);
  }

  warn(context: string, message: string, params: any[]): void {
    this.logger.warn(message, ...params, context);
  }

  error(context: string, message: any, params: any[]): void {
    this.logger.error(message, ...params, context);
  }
}
