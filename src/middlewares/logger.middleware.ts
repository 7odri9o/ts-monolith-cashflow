import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusMessage, statusCode } = response;
      const message = `${userAgent} ${ip} - [${method}] ${originalUrl} >>> ${statusCode}:${statusMessage}`;

      this.logger.log(message);
    });

    next();
  }
}
