import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import BaseEntity from '../../app.entity';
import { IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({ default: 'None' })
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.offers, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists, { eager: true })
  owner: User;
}
