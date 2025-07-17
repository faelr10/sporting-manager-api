import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaClient } from 'generated/prisma';
import { AccountService } from 'src/account/account.service';
import { AccountRepository } from 'src/account/account.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PrismaClient,
    AccountService,
    AccountRepository,
  ],
})
export class UserModule {}
