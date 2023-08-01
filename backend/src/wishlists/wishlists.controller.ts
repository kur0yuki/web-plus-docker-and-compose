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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/CreateWishlistDto';
import { Request } from 'express';
import { JwtGuard } from '../auth/jwtGuard';
import { UpdateWishlistDto } from './dto/UpdateWishlistDto';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishesService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: Request) {
    return this.wishesService.create(createWishlistDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Req() req: Request,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishesService.update({ id }, req.user, updateWishlistDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Req() req: Request) {
    return this.wishesService.delete({ id }, req.user);
  }
}
