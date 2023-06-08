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

export type AuthConfig = {
  jwtSecret: string;
  jwtExpiration: number;
};

export type MicroserviceConfig = {
  host: string;
  port: number;
};
