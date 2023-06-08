import {
  Module,
  Logger,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';
import { LoggerMiddleware } from './middlewares';
import { AuthModule } from './auth';
import { HealthcheckModule } from './healthcheck';
import { UsersModule } from './users';
import { CashInModule } from './cash-in';
import { CashOutModule } from './cash-out';

@Module({
  imports: [
    ConfigModule,
    HealthcheckModule,
    UsersModule,
    AuthModule,
    CashInModule,
    CashOutModule,
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
