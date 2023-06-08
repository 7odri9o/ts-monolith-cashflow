import * as cookieParser from 'cookie-parser';
import { createLogger } from 'winston';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { getLoggingConfig, WinstonLoggerService } from './logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const loggingConfig = getLoggingConfig();
  const logger = new WinstonLoggerService(createLogger(loggingConfig));

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });

  app.flushLogs();
  app.use(cookieParser());

  const config = app.get<ConfigService>(ConfigService);
  const { port } = config.app;

  await app.listen(port);
}
bootstrap();
