import * as cookieParser from 'cookie-parser';
import { createLogger } from 'winston';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { getLoggingConfig, WinstonLoggerService } from './logger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const loggingConfig = getLoggingConfig();
  const logger = new WinstonLoggerService(createLogger(loggingConfig));

  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });

  const config = app.get<ConfigService>(ConfigService);
  const { port } = config.app;

  app.flushLogs();
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: config.walletMs.port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
