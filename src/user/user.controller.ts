import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
  // @Redirect('http://google.com', 301)
  getAllUsers() {
    const a = this.userService.getAllUsers()
    return a[0].login
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `it's ${id}`
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createUser(@Body() createUserDto: CreateUserDto) {
    return `login: ${createUserDto.login}
    password ${createUserDto.password}`
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return `remove ${id}`
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdatePasswordDto, @Param('id') id: string) {
    return `prev: ${updateUserDto.oldPassword}
    new: ${updateUserDto.newPassword}
    id: ${id}`
  }

}
