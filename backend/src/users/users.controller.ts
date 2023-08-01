import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwtGuard';
import { UserProfileResponseDto } from './dto/UserProfileResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { WishesService } from '../wishes/wishes.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  findOwn(@Req() req): UserProfileResponseDto {
    return new UserProfileResponseDto(req.user);
  }

  @Patch('me')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(updateUserDto, { id: req.user.id });
  }

  @Get('me/wishes')
  getOwnWishes(@Req() req) {
    return this.wishesService.findBy({ owner: { id: req.user.id } });
  }

  @Post('find')
  async find(@Body() query: { [key: string]: string }) {
    const users = await this.userService.findManyBy(query);
    return users.map((user) => new UserProfileResponseDto(user));
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findOneBy({ username });
    return new UserProfileResponseDto(user);
  }

  @Get(':username/wishes')
  async findWishes(@Param('username') username: string) {
    return await this.wishesService.findBy({ owner: { username } });
  }
}
