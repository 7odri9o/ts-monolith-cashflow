import * as winston from 'winston';
import { ConsoleLogger } from '@nestjs/common';
import { format, transports } from './winston.utils';

const getLoggingConfig = (): winston.LoggerOptions => ({
  level: 'silly',
  format: winston.format.combine(
    format.defaultContext({ context: 'ts-monolith-cashflow' }),
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.splat(),
  ),

  transports: [new transports.NestTransport(new ConsoleLogger())],
});

export { getLoggingConfig };
