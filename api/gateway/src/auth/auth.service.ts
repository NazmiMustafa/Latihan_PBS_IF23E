import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // buat fungsi untuk login
  login(dto: AuthDto) {
    // buat variabel untuk payload
    const payload = {
      username: dto.username,
      password: dto.password,
    };

    // tampilkan hasil respon
    return {
      success: true,
      message: process.env.ACCESS_TOKEN,
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(payload),
        token_type: 'Bearer',
        expires_in: '1m',
      },
    };
  }
}
