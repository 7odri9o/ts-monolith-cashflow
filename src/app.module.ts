import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';

@Module({
  imports: [ConfigModule],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.logger.log('Initializing %s...', AppModule.name);
    this.logger.debug('Application config: %o', this.config);

    if (this.logger.localInstance.setLogLevels) {
      this.logger.localInstance.setLogLevels(this.config.logging.levels);
    }
  }
}
