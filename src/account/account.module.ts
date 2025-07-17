import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { PrismaClient } from 'generated/prisma';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountService, AccountRepository, PrismaClient],
})
export class AccountModule {}
