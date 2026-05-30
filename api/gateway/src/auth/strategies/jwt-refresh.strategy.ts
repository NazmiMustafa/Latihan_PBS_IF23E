import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';

const { ExtractJwt, Strategy } = passportJwt;

// buat interface
interface JwtPayload {
  username: string;
  passwrod: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: 'Refresh-IF23E',
    });
  }

  // fungsi untuk validasi jwt
  validate(payload: JwtPayload) {
    return payload;
  }
}
