import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import type { User } from './users.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async index() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const count = (await this.usersService.findAll()).length;

    const userDto: User = {
      id: count + 1,
      ...createUserDto,
    };

    const result = await this.usersService.create(userDto);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async detail(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/update')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto.fullname);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async destroy(@Param('id') id: number) {
    return this.usersService.destroy(id);
  }
}
