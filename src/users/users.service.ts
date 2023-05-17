import { Injectable, BadRequestException } from '@nestjs/common';
import type { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
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

  findAll(): User[] {
    return this.users;
  }
}
