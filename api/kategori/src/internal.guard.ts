import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

@Injectable()
export class InternalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // tambahkan header
    const secret = request.headers['x-internal-secret'];

    if (secret !== 'rahasia') {
      throw new UnauthorizedException({
        success: false,
        message: 'Akses Ditolak!',
        metadata: {
          status: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    return true;
  }
}
