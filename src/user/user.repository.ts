import { Injectable } from '@nestjs/common';
import { IUserRepository } from './structure';
import { PrismaClient, User } from 'generated/prisma';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createUser(params: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: params });
  }

  getUserByParams(where: Partial<User>): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }
}
