import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from '../../app.entity';
import { IsBoolean, IsNumber } from 'class-validator';
import { User } from '../../users/entities/users.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers, { eager: true })
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column()
  @IsBoolean()
  hidden: boolean;
}
