import * as winston from 'winston';
import { LoggerService, LogLevel } from '@nestjs/common';
import { WinstonConstants } from './winston.constants';

const SPLAT = WinstonConstants.SPLAT;

export interface LoggerOptions {
  context?: string;
  logLevels?: LogLevel[];
}

export class WinstonLoggerService implements LoggerService {
  private logLevels?: LogLevel[];
  private context?: string;

  constructor(
    private readonly logger: winston.Logger,
    options?: LoggerOptions,
  ) {
    options = options ?? {};

    this.context = options.context;
    this.logLevels = options.logLevels;
  }

  setLogLevels(levels: LogLevel[]) {
    this.logLevels = levels;
  }

  isLevelEnabled(level: LogLevel) {
    return this.logLevels?.includes(level) ?? true;
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('error')) {
      return;
    }

    const context = optionalParams[optionalParams.length - 1] ?? this.context;
    const stack = optionalParams[optionalParams.length - 2];
    const params = optionalParams.slice(0, -2);

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: _message, stack: _stack, name, ..._meta } = message;

      this.logger.log({
        context,
        level: 'error',
        message: (_message ?? message).toString(),
        stack: stack ?? _stack,
        [SPLAT]: [...params],
        ..._meta,
      });

      return;
    }

    this._log('error', { message, stack }, context, params);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }

    const context = optionalParams[optionalParams.length - 1] ?? this.context;
    const params = optionalParams.slice(0, -1);
    this._log('warn', message, context, params);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }

    const context = optionalParams[optionalParams.length - 1] ?? this.context;
    const params = optionalParams.slice(0, -1);
    this._log('debug', message, context, params);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }

    const context = optionalParams[optionalParams.length - 1] ?? this.context;
    const params = optionalParams.slice(0, -1);
    this._log('verbose', message, context, params);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('log')) {
      return;
    }

    const context = optionalParams[optionalParams.length - 1] ?? this.context;
    const params = optionalParams.slice(0, -1);
    this._log('info', message, context, params);
  }

  private _log(
    level: string,
    message: any,
    context: string,
    optionalParams: any[],
  ) {
    let meta: any;

    if ('object' === typeof message) {
      const { message: _message, ..._meta } = message;

      message = (_message ?? message).toString();
      meta = _meta;
    } else {
      message = message?.toString() || '<blank>';
      meta = {};
    }

    this.logger.log({
      context,
      level,
      message,
      [SPLAT]: optionalParams,
      ...meta,
    });
  }
}
