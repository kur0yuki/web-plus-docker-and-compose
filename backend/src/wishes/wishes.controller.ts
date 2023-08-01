import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwtGuard';
import { CreateWishDto } from './dto/CreateWishDto';
import { WishesService } from './wishes.service';
import { UpdateWishDto } from './dto/UpdateWishDto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user);
  }

  @Get('last')
  findLast() {
    return this.wishesService.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  @Get('top')
  findTop() {
    return this.wishesService.find({
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne({ id });
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
    @Param('id') id: number,
  ) {
    return this.wishesService.update({ id }, updateWishDto, true, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(@Param('id') id: number, @Req() req) {
    return this.wishesService.remove({ id }, req.user.id);
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  async copy(@Param('id') id: number, @Req() req) {
    return this.wishesService.copy(id, req.user);
  }
}
