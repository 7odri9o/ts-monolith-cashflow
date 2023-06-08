export interface ILoggerService {
  debug(context: string, message: string, params: any[]): void;
  verbose(context: string, message: string, params: any[]): void;
  log(context: string, message: string, params: any[]): void;
  warn(context: string, message: string, params: any[]): void;
  error(context: string, message: any, params: any[]): void;
}
