import { Controller, Get, Post,Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

}
