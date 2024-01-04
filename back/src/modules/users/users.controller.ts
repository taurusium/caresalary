import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  //TODO any 변경하기
  signUp(@Body() body: any) {
    return this.usersService.signUp(body);
  }
}
