import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { User } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  auth(user: User, res: Response) {
    this.logger.debug(`Auth method invoked for ${user.email}`);
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    res.cookie('token', token, {
      sameSite: true,
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 3600 * 1000,
    });
    this.logger.debug(`Auth method invoked for ${user.email} 2`);
    return { access_token: token };
  }

  async validatePassword(username: string, _password: string) {
    this.logger.debug(`Try to login ${username}`);
    const user: User = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException();
    this.logger.debug(`Found ${user.username}`);
    if (!(await bcrypt.compare(_password, user.password))) {
      this.logger.error(`Login failed for ${username}`);
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    this.logger.debug('Logged in %O with ' + password, result);
    return result;
  }
}
