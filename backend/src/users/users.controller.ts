import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   const createdUser = await this.usersService.create(createUserDto);
  //   return { message: 'User created successfully', user: createdUser };
  // }

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      };

      const createdUser = await this.usersService.create(newUser);

      return createdUser;
    } catch (error) {
      throw new BadRequestException('Failed to register user');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const { username, password } = loginDto;
      const token = await this.usersService.login(username, password);
      return { token };
    } catch (error) {
      throw new BadRequestException('Login Failed');
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        updatePasswordDto.currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(
        updatePasswordDto.newPassword,
        10,
      );
      user.password = hashedPassword;

      return this.usersService.update(id, user);
    } catch (error) {
      throw new BadRequestException('Failed to change password');
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
