import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/todo/user/user.service';
import * as bcrypt from 'bcrypt';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return null;
    return { id: user.id, username: user.username, name: user.name };
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.id };

    const res = {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      name: user.name,
      username: user.username,
    };
    return res;
  }
}
