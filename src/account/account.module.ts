import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { PrismaClient } from 'generated/prisma';
import { AccountController } from './account.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, PrismaClient],
})
export class AccountModule {}
