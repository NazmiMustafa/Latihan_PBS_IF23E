import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // buat fungsi untuk login
  login(dto: AuthDto) {
    // jika username dan password tidak valid
    if (dto.username !== 'admin' || dto.password !== 'admin123') {
      throw new UnauthorizedException({
        success: false,
        message: 'Data User / Password Tidak Valid !',
        metadata: {
          status: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    // jika username dan password valid
    // buat variabel untuk payload
    const payload = {
      username: dto.username,
      password: dto.password,
    };

    // tampilkan hasil respon
    return {
      success: true,
      message: 'Access Token Berhasil Dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(dto, {
          secret: 'Access-IF23E',
          expiresIn: '1m',
        }),

        refresh_token: this.jwtService.sign(payload, {
          secret: 'Refresh-IF23E',
          expiresIn: '3m',
        }),

        // token_type: 'Bearer',
        // expires_in: 60,
      },
    };
  }

  refresh(user: AuthDto) {
    const payload = {
      username: user.username,
      password: user.password,
    };

    return {
      success: true,
      message: 'Access Token Berhasil Dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: 'Access-IF23E',
          expiresIn: '1m',
        }),
      },
    };
  }
}
