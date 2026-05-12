import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // import passport dan jwt (untuk buat token)
  imports: [
    // cek kesesuaian dengan jwt.guard
    PassportModule.register({}),
    // cek kesesuian dengan jwt.strategy
    JwtModule.register({
      secret: 'IF23E', //ga bisa di bikin konstanta
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
