import { Module } from '@nestjs/common';
import { JwtModule } from '@/jwt';
import { DatabaseModule } from '@/database';
import { UsersModule } from '@/users';
import { CashInController } from './cash-in.controller';
import { CashInRepository } from './cash-in.repository';
import { CashInService } from './cash-in.service';

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule],
  controllers: [CashInController],
  providers: [CashInService, CashInRepository],
})
export class CashInModule {}
