import { Injectable } from '@nestjs/common';
import { Account, PrismaClient } from 'generated/prisma';
import { IAccountParams, IAccountRepository } from './structure';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createAccount(params: IAccountParams): Promise<Account> {
    return this.prisma.account.create({ data: params });
  }

  getAccountByParams(where: Partial<IAccountParams>): Promise<Account | null> {
    return this.prisma.account.findFirst({
      where,
    });
  }
}
