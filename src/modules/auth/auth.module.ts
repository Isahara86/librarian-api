import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../../environment';
import { JwtStrategy } from './jwt.strategy';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      // TODO add expiresIn and token renew
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAdminStrategy],
  exports: [AuthService],
})
export class AuthModule {}
