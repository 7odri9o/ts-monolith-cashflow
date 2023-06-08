import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfig } from './config.type';

@Injectable()
export class ConfigService {
  readonly app: AppConfig;

  constructor(private readonly nestConfigService: NestConfigService) {
    this.app = {
      port: parseInt(nestConfigService.getOrThrow('PORT'), 10),
    };
  }
}
