import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@/config';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor(configService: ConfigService) {
    const { url } = configService.db;
    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async connect() {
    return this.$connect();
  }

  async disconnect() {
    return this.$disconnect();
  }
}
