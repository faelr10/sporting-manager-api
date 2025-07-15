import { Module } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaClient, JwtService],
})
export class AuthModule {}
