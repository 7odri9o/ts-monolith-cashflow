import { Module } from '@nestjs/common';
import { JwtModule } from '@/jwt';
import { CashInModule } from '@/cash-in';
import { CashOutModule } from '@/cash-out';
import { ConfigModule } from '@/config';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [JwtModule, CashInModule, CashOutModule, ConfigModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
