import { Logger, Provider } from '@nestjs/common';

interface LoggerEntry {
  token: symbol;
  context: string;
}

const loggers: LoggerEntry[] = [];

export async function createLoggerProviders(): Promise<Provider<Logger>[]> {
  await new Promise(setImmediate);

  return loggers
    .splice(0)
    .map((entry) => createLoggerProvider(entry.token, entry.context));
}

export function registerLoggerProvider(entry: LoggerEntry) {
  loggers.push(entry);
}

function createLoggerProvider(
  provide: symbol,
  context: string,
): Provider<Logger> {
  return {
    provide,
    useFactory: () => {
      return new Logger(context);
    },
  };
}
