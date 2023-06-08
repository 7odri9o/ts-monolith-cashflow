import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config';
import { JwtModule } from '@/jwt';
import { UsersModule } from '@/users';
import { JwtStrategy, LocalStrategy } from '@/strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
