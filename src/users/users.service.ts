import { Injectable, BadRequestException } from '@nestjs/common';
import type { User } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  SALT_OR_ROUND = 16;

  private readonly users: User[] = [];

  async create(user: User) {
    const password = await bcrypt.hash(user.password, this.SALT_OR_ROUND);
    console.log(password);

    this.users.push({ ...user, password });
  }

  findOne(email: string): Omit<User, 'password'> {
    const user = this.users.find((user) => user.email === email);
    if (!user) throw new BadRequestException('user not found');

    const { password, ...result } = user;
    return result;
  }

  findById(id: string): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new BadRequestException('user not found');

    const { password, ...result } = user;
    return result;
  }

  update(id: string, fullname: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new BadRequestException('user not found');

    user.fullname = fullname;
    const { password, ...result } = user;
    return result;
  }

  destroy(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex == -1) throw new BadRequestException('user not found');

    this.users.splice(userIndex, 1);
    return 'ok';
  }

  findAll(): Omit<User, 'password'>[] {
    return this.users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }
}
