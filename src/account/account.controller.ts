import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccountService } from './structure';

@Controller('auth')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: IAccountService,
  ) {}

  @Post('login')
  login(@Param('id') id: string) {
    return this.accountService.getAccountById(id);
  }
}
