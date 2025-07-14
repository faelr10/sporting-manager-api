import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/createUser.dto';

export interface IUserService {
  createUser(params: CreateUserDto): Promise<IUserResponse>;
  getUserByParams(id: string): Promise<IUserResponse>;
}

export interface IUserRepository {
  createUser(params: CreateUserDto): Promise<User>;
  getUserByParams(where: Partial<User>): Promise<User | null>;
}

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  local_name: string;
  createdAt: Date;
  updatedAt: Date;
};
