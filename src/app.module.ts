import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import {
  Module,
  Logger,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from './config';
import { LoggerMiddleware } from './middlewares';
import { AuthModule } from './auth';
import { HealthcheckModule } from './healthcheck';
import { BalanceModule } from './balance';
import { UsersModule } from './users';
import { CashInModule } from './cash-in';
import { CashOutModule } from './cash-out';
import { WalletModule } from './wallet';

@Module({
  imports: [
    ConfigModule,
    HealthcheckModule,
    UsersModule,
    AuthModule,
    BalanceModule,
    CashInModule,
    CashOutModule,
    WalletModule,
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.cache.ttl,
        store: (await redisStore({
          url: configService.cache.url,
        })) as unknown as CacheStore,
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onModuleInit() {
    this.logger.log('Initializing %s...', AppModule.name);
    this.logger.debug('Application config: %o', this.config);

    if (this.logger.localInstance.setLogLevels) {
      this.logger.localInstance.setLogLevels(this.config.logging.levels);
    }
  }
}
