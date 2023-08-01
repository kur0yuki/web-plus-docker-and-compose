import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOfferDto } from './dto/CreateOfferDto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Offer } from './entities/offer.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private dataSource: DataSource,
  ) {}
  async create(createOfferDto: CreateOfferDto, user) {
    createOfferDto['user'] = user;
    const offer = this.offersRepository.create(createOfferDto);
    const item = await this.wishesService.findOne({
      id: createOfferDto.itemId,
    });
    item.raised += offer.amount;

    if (user.id === item.owner.id)
      throw new ForbiddenException('Нельзя вложиться в собственный подарок');
    if (item.raised > item.price)
      throw new ForbiddenException('Нельзя вложить больше стоимости подарка');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let savedOffer;

    try {
      this.logger.debug('try to update; id=' + item.id);
      await this.wishesService.update({ id: item.id }, { raised: item.raised });
      this.logger.debug('updated');

      offer.item = item;
      savedOffer = await this.offersRepository.save(offer);
      this.logger.debug('saved');
      await queryRunner.commitTransaction();
    } catch (e) {
      savedOffer = e;
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return savedOffer;
  }

  findOne(query) {
    return this.offersRepository.findOneBy(query);
  }
}
