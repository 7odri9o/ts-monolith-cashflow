import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const { port } = configService.app;
  await app.listen(port);
}

bootstrap();
