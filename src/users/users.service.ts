import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserEntity } from './users.entity';
import type { User } from './users.interface';

@Injectable()
export class UsersService {
  SALT_OR_ROUND = 16;

  // private readonly users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: User) {
    const password = await bcrypt.hash(user.password, this.SALT_OR_ROUND);
    await this.usersRepository.insert({ ...user, password });
    const { password: p, ...result } = user;
    return result;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('user not found');
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, fullname: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('user not found');
    user.fullname = fullname;
    await this.usersRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async destroy(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('user not found');
    await this.usersRepository.delete(user);
    return 'deleted';
  }
}
