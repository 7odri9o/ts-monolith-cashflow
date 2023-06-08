import { Module } from '@nestjs/common';
import { JwtModule } from '@/jwt';
import { DatabaseModule } from '@/database';
import { UsersModule } from '@/users';
import { CashOutController } from './cash-out.controller';
import { CashOutService } from './cash-out.service';
import { CashOutRepository } from './cash-out.repository';

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule],
  controllers: [CashOutController],
  providers: [CashOutService, CashOutRepository],
})
export class CashOutModule {}
