import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.auth.dto';
import { UsersService } from '../users/users.service';
import { LocalGuard } from './localGuard';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.auth(req.user, res);
  }

  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    console.log(signUpUserDto);
    return await this.userService.create(signUpUserDto);
  }
}
