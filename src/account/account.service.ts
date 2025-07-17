import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import {
  AccountStatus,
  AccountStatusResponse,
  AccountType,
  IAccountRepository,
  IAccountService,
} from './structure';
import { Account } from 'generated/prisma';
import { CreateAccountDto } from './dto/createAccount.dto';
import { format } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz'; // Para formatação específica de fuso horário

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
    const account = await this.userRepository.getAccountByParams({
      user_id: id,
    });
    if (!account) {
      return null;
    }

    const dateFromDB = new Date(account.dt_vencimento);
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(dateFromDB, timeZone);
    const formattedDateWithOffset = format(
      zonedDate,
      'yyyy-MM-dd HH:mm:ss.SSS XXX',
    );

    console.log(formattedDateWithOffset);
    account.dt_vencimento = new Date(formattedDateWithOffset);

    return account;
  }

  async verifyStatusAccount(id: string): Promise<AccountStatusResponse> {
    const account = await this.userRepository.getAccountByParams({
      user_id: id,
    });

    if (!account) {
      throw new Error('Account not found');
    }

    const timeZone = 'America/Sao_Paulo';
    const now = toZonedTime(new Date(), timeZone);
    const expirationDate = toZonedTime(
      new Date(account.dt_vencimento),
      timeZone,
    );

    const isExpiredTrail = account.type === 'trail' && expirationDate < now;

    return {
      status: isExpiredTrail ? AccountStatus.INACTIVE : account.status,
      type: account.type,
    };
  }
}
