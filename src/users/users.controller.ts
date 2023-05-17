import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import type { User } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async index() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const count = this.usersService.findAll().length;

    const userDto: User = {
      id: (count + 1).toString(),
      ...createUserDto,
    };

    this.usersService.create(userDto);
    const { password, ...result } = userDto;
    return result;
  }

  @Get('/:id')
  async detail(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post('/:id/update')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto.fullname);
  }

  @Delete('/:id')
  async destroy(@Param('id') id: string) {
    return this.usersService.destroy(id);
  }
}
