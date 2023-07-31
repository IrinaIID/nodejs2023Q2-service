import { Injectable } from '@nestjs/common';
import { dbUsers } from 'src/database/database';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAllUsers() {
    return dbUsers;
  }

  getUser(id: string) {
    return dbUsers.find((user) => user.id === id);
  }

  createUser(userDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    dbUsers.push(newUser);
    return newUser;
  }

  updateUser(userDto: UpdatePasswordDto, id: string) {
    const user = dbUsers.find((user) => user.id === id);
    if (!user) {
      return '404';
    } else if (user.password !== userDto.oldPassword) {
      return '403';
    } else {
      const index = dbUsers.findIndex((user) => user.id === id);
      dbUsers[index].password = userDto.newPassword;
      return dbUsers[index];
    }
  }

  deleteUser(id: string) {
    const index = dbUsers.findIndex((user) => user.id === id);
    if (index < 0) {
      return '404';
    } else {
      const index = dbUsers.findIndex((user) => user.id === id);
      dbUsers.splice(index, 1);
      return '204';
    }
  }
}
