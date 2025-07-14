import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaClient } from 'generated/prisma';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaClient],
})
export class UserModule {}
