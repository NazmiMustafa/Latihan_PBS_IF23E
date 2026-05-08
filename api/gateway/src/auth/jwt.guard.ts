import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//buat class untuk guard service
export class JwtGuard extends AuthGuard('jwt') {} //ini juga menggunakan .env
