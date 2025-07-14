import { Injectable } from '@nestjs/common';
import { PrismaClient, Schedule } from 'generated/prisma';
import {
  IParamsScheduleRepository,
  IParamsUpdateScheduleRepository,
  IScheduleRepository,
} from './structure';

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createSchedule(params: IParamsScheduleRepository): Promise<Schedule> {
    return this.prisma.schedule.create({
      data: {
        date: params.date,
        user_id: params.user_id,
        start_time: params.start_time,
        end_time: params.end_time,
        client_name: params.client_name,
        recurrence: params.recurrence ?? undefined,
      },
    });
  }

  async getScheduleById(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async getAllSchedulesByUserId(userId: string): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: { user_id: userId },
      orderBy: { date: 'asc' },
    });
  }

  async updateSchedule(
    id: string,
    params: IParamsUpdateScheduleRepository,
  ): Promise<Schedule | null> {
    return this.prisma.schedule.update({
      where: { id },
      data: params,
    });
  }

  async deleteSchedule(id: string): Promise<Schedule | null> {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
