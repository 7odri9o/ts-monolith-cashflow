import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@/jwt';
import { WALLET_SERVICE } from '@/constants';
import { ConfigModule, ConfigService } from '@/config';
import { DatabaseModule } from '@/database';
import { UsersModule } from '@/users';
import { CashInController } from './cash-in.controller';
import { CashInService } from './cash-in.service';
import { CashInRepository } from './cash-in.repository';

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
  controllers: [CashInController],
  providers: [CashInService, CashInRepository],
})
export class CashInModule {}
