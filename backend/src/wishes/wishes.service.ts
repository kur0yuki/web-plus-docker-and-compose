import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/CreateWishDto';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async create(createWishDto: CreateWishDto, user) {
    this.logger.debug(`Creating wish %o for %o`, createWishDto, user);
    createWishDto['owner'] = user;
    const wish = this.wishesRepository.create(createWishDto);
    return this.wishesRepository.save(wish);
  }

  async find({ order, take }) {
    return this.wishesRepository.find({
      order,
      take,
    });
  }

  async findBy(query) {
    const wishes = await this.wishesRepository.findBy(query);
    this.logger.debug('Found %O for %O', wishes, query);
    return wishes;
  }

  async findOne(query) {
    const wish = await this.wishesRepository.findOne({
      where: query,
      relations: { offers: true },
    });
    //this.logger.debug(`found by %O %O`, query, wish);
    if (!wish) throw new NotFoundException();
    wish.offers = wish.offers.map((offer) => ({
      ...offer,
      name: offer.user.username,
    }));
    //this.logger.debug('%O', wish.offers);
    return wish;
  }

  async remove(query, id) {
    const wish = await this.wishesRepository.findOneBy(query);
    this.logger.debug(`%O`, wish);
    if (!wish) throw new NotFoundException('Такого подарка не существует');
    if (wish.owner.id !== id)
      throw new ForbiddenException('Можно удалять только свои подарки');
    return this.wishesRepository.remove(wish);
  }

  async update(
    query,
    updateWishDto: QueryPartialEntity<Wish>,
    ownEdit = false,
    id = null,
  ) {
    const wish = await this.wishesRepository.findOneBy(query);
    this.logger.debug('%O, userId=%d', wish, id);
    this.logger.debug('%O', updateWishDto);
    if (!wish) throw new NotFoundException('Подарок не найден');
    if (ownEdit && wish.owner.id !== id)
      throw new ForbiddenException('Нельзя редактировать чужой подарок');
    if (wish.raised > 0 && updateWishDto.price)
      throw new ForbiddenException(
        'Нельзя изменять цену, если на подарок уже сбросились',
      );
    await this.wishesRepository.update(query, updateWishDto);
    return this.wishesRepository.findBy({ id: wish.id });
  }

  async copy(id: number, user) {
    const wish = await this.wishesRepository.findOneBy({ id });
    this.logger.debug(`Copying %O to user{${user.id}}`, wish);
    if (!wish) throw new NotFoundException();
    this.logger.debug(`Copying %O to user{${user.id}}`, wish);
    // const { id: _, copied, raised, ...newWish } = wish;
    if (
      await this.wishesRepository.findOneBy({
        owner: { id: user.id },
        link: wish.link,
      })
    )
      throw new ForbiddenException('У вас уже есть такой подарок');
    Object.assign(wish, {
      id: undefined,
      copied: undefined,
      raised: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
    return this.create(wish, user);
  }
}
