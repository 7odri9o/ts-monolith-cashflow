import { Module } from '@nestjs/common';
import { JwtModule } from '@/jwt';
import { DatabaseModule } from '@/database';
import { UsersModule } from '@/users';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
