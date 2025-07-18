import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './schedule.repository';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository, PrismaClient, JwtService],
})
export class ScheduleModule {}
