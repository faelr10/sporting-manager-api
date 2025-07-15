import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { ScheduleRepository } from './schedule.repository';
import {
  IParamsScheduleRepository,
  IParamsUpdateScheduleRepository,
  IScheduleRepository,
  IScheduleService,
} from './structure';
import { Schedule } from 'generated/prisma';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @Inject(ScheduleRepository)
    private readonly scheduleRepository: IScheduleRepository,
  ) {}

  async createSchedule(params: CreateScheduleDto): Promise<any> {
    const scheduleBase = {
      ...params,
      user_id: '97443970-f547-4c2f-ab5c-58895516eabd', // fixo por enquanto
    };

    // 1. Verifica conflitos
    const existingSchedules =
      await this.scheduleRepository.getAllSchedulesByUserId(
        scheduleBase.user_id,
      );

    for (const existing of existingSchedules) {
      if (existing.date === scheduleBase.date) {
        const conflict =
          scheduleBase.start_time < existing.end_time &&
          scheduleBase.end_time > existing.start_time;

        if (conflict) {
          throw new ForbiddenException('Conflito de agenda');
        }
      }
    }

    // 2. Recorrência semanal
    if (
      params.recurrence?.frequency === 'weekly' &&
      params.recurrence.count > 0
    ) {
      const agendas: IParamsScheduleRepository[] = [];

      let currentDate = scheduleBase.date;

      for (let i = 0; i < params.recurrence.count; i++) {
        const newSchedule: IParamsScheduleRepository = {
          ...scheduleBase,
          date: currentDate,
          recurrence: {
            frequency: params.recurrence.frequency,
            interval: params.recurrence.interval,
            count: params.recurrence.count,
          },
        };

        await this.scheduleRepository.createSchedule(newSchedule);
        agendas.push(newSchedule);

        currentDate = this.calculateNextDate(currentDate);
      }

      return null;
    }

    // 3. Agenda única
    const created = await this.scheduleRepository.createSchedule(scheduleBase);
    return created;
  }

  private calculateNextDate(date: string): string {
    const parsed = new Date(date);
    parsed.setDate(parsed.getDate() + 7);
    return parsed.toISOString().split('T')[0];
  }

  async getAllSchedules(): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.getAllSchedulesByUserId(
      '97443970-f547-4c2f-ab5c-58895516eabd',
    );

    return schedules;
  }

  async getSchedulesByUserId(id: string): Promise<Schedule[]> {
    return this.scheduleRepository.getAllSchedulesByUserId(id);
  }

  async updateSchedule(
    id: string,
    params: IParamsUpdateScheduleRepository,
  ): Promise<Schedule | null> {
    return this.scheduleRepository.updateSchedule(id, params);
  }

  async deleteSchedule(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.deleteSchedule(id);
  }
}
