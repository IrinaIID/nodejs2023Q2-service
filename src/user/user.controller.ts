import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { validate as uuidValidate } from 'uuid'
import express, {Request, Response} from 'express';



// interface User {
//   id: string; // uuid v4
//   login: string;
//   password: string;
//   version: number; // integer number, increments on update
//   createdAt: number; // timestamp of creation
//   updatedAt: number; // timestamp of last update
// }

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @Redirect('http://google.com', 301)
  getAllUsers() {
    const users = this.userService.getAllUsers();
    return JSON.stringify(users)
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const user = this.userService.getUser(id);
      if(!user) {
        res.status(HttpStatus.NOT_FOUND)
      } else {
        res.status(HttpStatus.OK);
        return JSON.stringify(user)
      }
    }
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
