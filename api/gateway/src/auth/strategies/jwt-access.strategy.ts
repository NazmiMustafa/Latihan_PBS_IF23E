import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';

const { ExtractJwt, Strategy } = passportJwt;

// buat interface
interface JwtPayload {
  username: string;
  password: string;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Access-IF23E',
    });
  }

  // fungsi untuk validasi jwt
  validate(payload: JwtPayload) {
    return payload;
  }
}
