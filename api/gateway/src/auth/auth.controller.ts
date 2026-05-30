import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

interface JwtPayload {
  username: string;
  password: string;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    // panggil fungsi login (AuthService)
    return this.authService.login(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req: RequestWithUser) {
    return this.authService.refresh(req.user);
  }
}
