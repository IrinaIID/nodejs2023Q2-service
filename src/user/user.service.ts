import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

const testUser: User = {
  id: uuidv4(), // uuid v4
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
    return this.users.push({
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: +(new Date()),
      updatedAt: +(new Date())
    })
  }
}