import { ConfigModule, ConfigService } from '@/config';
import { Module } from '@nestjs/common';
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtValidation } from './jwt.validation';
import { UsersModule } from '@/users';
@Module({
  imports: [
    ConfigModule,
    UsersModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.auth.jwtSecret,
        signOptions: {
          expiresIn: `${configService.auth.jwtExpiration}s`,
        },
      }),
    }),
  ],
  providers: [JwtService, JwtValidation],
  exports: [JwtService, JwtValidation],
})
export class JwtModule {}
