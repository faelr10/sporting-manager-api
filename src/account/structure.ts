import { Account } from 'generated/prisma';
import { CreateAccountDto } from './dto/createAccount.dto';

export interface IAccountService {
  createAccount(params: CreateAccountDto): Promise<Account>;
  getAccountById(id: string): Promise<Account | null>;
}

export interface IAccountRepository {
  createAccount(params: IAccountParams): Promise<Account>;
  getAccountByParams(where: Partial<Account>): Promise<Account | null>;
}

export interface IAccountParams {
  user_id: string;
  status: string;
  type: string;
  dt_vencimento: Date;
}

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum AccountType {
  TRAIL = 'trail',
  MENSAL = 'mensalista',
}
