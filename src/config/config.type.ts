import { LogLevel } from '@nestjs/common';

export type AppConfig = {
  port: number;
};

export type Logging = {
  levels: LogLevel[];
};

export type DbConfig = {
  url: string;
};
