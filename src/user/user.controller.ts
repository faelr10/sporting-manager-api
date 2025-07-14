import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserService } from './structure';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.userService.getUserByParams(id);
  }
}
