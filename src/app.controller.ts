import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/services/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post("login")
  @UseGuards(new LocalAuthGuard())
  async login(@Request() req) {
    return this.authService.login(req?.user);
  }

}
