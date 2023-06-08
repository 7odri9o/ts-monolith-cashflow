import * as cookieParser from 'cookie-parser';
import { createLogger } from 'winston';
import { APP_INTERCEPTOR, NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { getLoggingConfig, WinstonLoggerService } from './logger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const loggingConfig = getLoggingConfig();
  const logger = new WinstonLoggerService(createLogger(loggingConfig));

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });

  app.flushLogs();
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = app.get<ConfigService>(ConfigService);
  const { port } = config.app;

  await app.listen(port);
}
bootstrap();
