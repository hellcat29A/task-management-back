import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { SigninUserDto } from '../dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.usersService.signin(signinUserDto);
  }
  @Get('all')
  getAll() {
    return this.usersService.findAll();
  }
  @Get()
  getOne(email: string) {
    return this.usersService.findOne(email);
  }
}
