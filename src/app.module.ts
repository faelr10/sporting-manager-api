import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [UserModule, ScheduleModule, AuthModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
