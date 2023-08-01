import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from '../auth/dto/signup.auth.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneBy(query: { [key: string]: string | number }) {
    return await this.usersRepository.findOneByOrFail(query);
  }

  async findManyBy(query: { [key: string]: string }) {
    return await this.usersRepository.findBy([
      { email: query.query },
      { username: query.query },
    ]);
  }

  async create(signUpUserDto: SignUpUserDto) {
    this.logger.debug(`Register ${JSON.stringify(signUpUserDto)}`);
    signUpUserDto.password = await bcrypt.hash(signUpUserDto.password, 10);
    const user = this.usersRepository.create(signUpUserDto);

    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      throw new UnauthorizedException(
        'Пользователь с таким логином и/или email уже существует',
      );
    }
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(
    updateUserDto: UpdateUserDto,
    query: { [key: string]: string | number },
  ) {
    this.logger.debug(`Updating user %o with %o`, query, updateUserDto);
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    try {
      await this.usersRepository.update(query, updateUserDto);
    } catch (e) {
      throw new ForbiddenException(
        'Пользователь с таким логином и/или email уже существует',
      );
    }
    return this.usersRepository.findOneBy(query);
  }
}
