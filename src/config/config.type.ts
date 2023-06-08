import { LogLevel } from '@nestjs/common';

export type AppConfig = {
  port: number;
};

export type Logging = {
  levels: LogLevel[];
};
