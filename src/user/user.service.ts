import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

const testUser: User = {
  id: uuidv4(),
  login: 'test-login',
  password: 'test-password-111',
  version: 1,
  createdAt: +(new Date()),
  updatedAt: +(new Date())
}

@Injectable()
export class UserService {
  users: User[] = [testUser]

  getAllUsers() {
    return this.users
  }

  getUser(id: string) {
    return this.users.find(user => user.id === id)
  }

  createUser(userDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: +(new Date()),
      updatedAt: +(new Date())
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(userDto: UpdatePasswordDto, id: string) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return '404'
    } else if (user.password !== userDto.oldPassword) {
      return '403'
    } else {
      this.users.map(user => {
        if (user.id === id) {
          user.password = userDto.newPassword
        }
      })
      return '200'
    }
  }

  deleteUser(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index < 0) {
      return '404'
    } else {
      this.users = this.users.filter(user => user.id !== id);
      return '204'
    }
  }
}