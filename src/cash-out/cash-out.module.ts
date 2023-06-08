import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@/config';
import { WALLET_SERVICE } from '@/constants';
import { JwtModule } from '@/jwt';
import { DatabaseModule } from '@/database';
import { UsersModule } from '@/users';
import { CashOutController } from './cash-out.controller';
import { CashOutService } from './cash-out.service';
import { CashOutRepository } from './cash-out.repository';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule,
    ClientsModule.registerAsync([
      {
        name: WALLET_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.walletMs.host,
            port: configService.walletMs.port,
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [CashOutController],
  providers: [CashOutService, CashOutRepository],
})
export class CashOutModule {}
