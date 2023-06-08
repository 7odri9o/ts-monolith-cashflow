import { DynamicModule, Global } from '@nestjs/common';
import { createLoggerProviders } from './logger.internal';

@Global()
export class LoggerModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const dynamicProviders = await createLoggerProviders();

    return {
      module: LoggerModule,
      providers: [...dynamicProviders],
      exports: [...dynamicProviders],
    };
  }
}
