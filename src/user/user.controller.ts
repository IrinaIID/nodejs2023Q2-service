import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';
import { User } from 'src/interfaces/interfaces';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @Redirect('http://google.com', 301)
  getAllUsers(): User[] | [] {
    const users = this.userService.getAllUsers();
    return users
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response): User {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const user = this.userService.getUser(id);
      if(!user) {
        res.status(HttpStatus.NOT_FOUND)
      } else {
        res.status(HttpStatus.OK);
        return user
      }
    }
  }

  @Post()
  // @Header('Cache-Control', 'none')
  createUser(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    if (!createUserDto.login || !createUserDto.password) {
      res.status(HttpStatus.BAD_REQUEST);
      return
    } else {
      const newUser = this.userService.createUser(createUserDto);
      res.status(HttpStatus.CREATED);
      return newUser
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.userService.deleteUser(id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : res.status(HttpStatus.NO_CONTENT);
    }
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdatePasswordDto, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.userService.updateUser(updateUserDto, id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : status === '403' ? res.status(HttpStatus.FORBIDDEN) : res.status(HttpStatus.OK);
    }
  }
}
