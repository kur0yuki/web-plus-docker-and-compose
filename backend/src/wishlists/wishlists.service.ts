import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/CreateWishlistDto';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async findAll() {
    return await this.wishlistsRepository.find();
  }

  async create(createWishlistDto: CreateWishlistDto, user) {
    this.logger.debug(`Creating wish %o for %o`, createWishlistDto, user);
    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    wishlist.items = await this.wishesService.findBy({
      id: In([...createWishlistDto.itemsId]),
    });
    wishlist.owner = user;
    return await this.wishlistsRepository.save(wishlist);
  }

  async findOne(query: { id: number }) {
    return await this.wishlistsRepository.findOneBy(query);
  }

  async update(query, user, updateWishlistDto: CreateWishlistDto) {
    const wishlist = await this.findOne(query);
    if (!wishlist) throw new NotFoundException();
    if (wishlist.owner.id !== user.id) throw new ForbiddenException();

    if (updateWishlistDto.itemsId)
      wishlist.items = await this.wishesService.findBy({
        id: In([...updateWishlistDto.itemsId]),
      });
    delete updateWishlistDto.itemsId;

    return this.wishlistsRepository.save({ ...wishlist, ...updateWishlistDto });
  }

  async delete(query: { id: number }, user) {
    const wishlist = await this.findOne(query);
    if (!wishlist) throw new NotFoundException();
    if (wishlist.owner.id !== user.id) throw new ForbiddenException();
    return this.wishlistsRepository.delete(query);
  }
}
