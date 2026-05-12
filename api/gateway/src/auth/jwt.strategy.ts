import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';
import { AuthDto } from './dto/auth.dto';

const { ExtractJwt, Strategy } = passportJwt;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //pembacaan token jwt
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'IF23E', //ga bisa di bikin konstanta
    });
  }

  // fungsi untuk validasi jwt
  validate(payload: AuthDto) {
    return payload;
  }
}
