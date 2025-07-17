import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccountService } from './structure';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: IAccountService,
  ) {}

  @Get(':id')
  getAccount(@Param('id') id: string) {
    return this.accountService.verifyStatusAccount(id);
  }
}
