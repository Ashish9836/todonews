import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Post('anynews')
  getAnyNews(@Body() filter: any) {
    return this.appService.getNewsAny(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('breakingnews')
  getBreakingNews(@Body() filter: any) {
    
    return this.appService.getBreakingNews(filter);
  }
}
