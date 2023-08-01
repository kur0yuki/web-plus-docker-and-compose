import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/CreateOfferDto';
import { JwtGuard } from '../auth/jwtGuard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return this.offersService.create(createOfferDto, req.user);
  }

  @Get()
  async get(@Req() req) {
    return this.offersService.findOne({ user: req.user });
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.offersService.findOne({ id });
  }
}
