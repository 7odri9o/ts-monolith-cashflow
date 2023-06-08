import * as winston from 'winston';
import { NestTransport } from './nest.transport';
export { WinstonConstants } from './winston.constants';

export interface ContextOptions {
  context: string;
}

function defaultContextTransform(
  info: winston.Logform.TransformableInfo,
  opts?: ContextOptions,
) {
  info.context = info.context ?? opts?.context;
  return info;
}

export const format = {
  defaultContext: winston.format(defaultContextTransform) as (
    opts: ContextOptions,
  ) => winston.Logform.Format,
};

export const transports = {
  NestTransport,
};
