import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  async healthcheck() {
    return {
      name: 'cash-flow',
      status: 'up',
    };
  }
}
