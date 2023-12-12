import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp() {
    return this.usersService.signUp();
  }

  @Get('/test')
  getUser() {
    return this.usersService.getUser();
  }
}
