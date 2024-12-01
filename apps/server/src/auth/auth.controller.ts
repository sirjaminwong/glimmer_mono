import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
import { LocalAuthGuard } from '@server/auth/local-auth.guard';
import { JwtAuthGuard } from '@server/auth/jwt-auth.guard';
import { UserService } from '@server/user/user.service';

interface RegisterDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: FastifyRequest) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.login({
      screenName: req.user.screenName,
      userId: req.user.id,
    });

    return {
      access_token: token.access_token,
      user: req.user,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: FastifyRequest) {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.username, body.password);
  }
}
