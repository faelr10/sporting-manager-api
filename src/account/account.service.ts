import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import {
  AccountStatus,
  AccountType,
  IAccountRepository,
  IAccountService,
} from './structure';
import { Account } from 'generated/prisma';
import { CreateAccountDto } from './dto/createAccount.dto';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(AccountRepository)
    private readonly userRepository: IAccountRepository,
  ) {}

  async createAccount(params: CreateAccountDto): Promise<Account> {
    const newAccount = await this.userRepository.createAccount({
      ...params,
      status: AccountStatus.ACTIVE,
      type: AccountType.TRAIL,
      dt_vencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    return newAccount;
  }

  async getAccountById(id: string): Promise<Account | null> {
    return this.userRepository.getAccountByParams({ user_id: id });
  }
}
