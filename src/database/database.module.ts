import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    await this.databaseService.connect();
  }

  async onModuleDestroy() {
    await this.databaseService.disconnect();
  }
}
