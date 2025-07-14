import { Schedule } from 'generated/prisma';
import { CreateScheduleDto } from './dto/createSchedule.dto';

export interface IScheduleService {
  createSchedule(params: CreateScheduleDto): Promise<Schedule>;
  getAllSchedules(): Promise<Schedule[]>;
  updateSchedule(
    id: string,
    params: IParamsUpdateScheduleRepository,
  ): Promise<Schedule | null>;
  deleteSchedule(id: string): Promise<Schedule | null>;
}

export interface IScheduleRepository {
  createSchedule(params: IParamsScheduleRepository): Promise<Schedule>;
  getScheduleById(id: string): Promise<Schedule | null>;
  getAllSchedulesByUserId(userId: string): Promise<Schedule[]>;
  updateSchedule(
    id: string,
    params: IParamsUpdateScheduleRepository,
  ): Promise<Schedule | null>;
  deleteSchedule(id: string): Promise<Schedule | null>;
}

export type IParamsScheduleRepository = {
  date: string;
  user_id: string;
  start_time: string;
  end_time: string;
  client_name: string;
  recurrence?: {
    frequency: string;
    interval: number;
    count: number;
  };
};

export type IParamsUpdateScheduleRepository = {
  date?: string;
  start_time?: string;
  end_time?: string;
  client_name?: string;
  recurrence?: {
    frequency?: string;
    interval?: number;
    count?: number;
  };
};

export type IScheduleResponse = {
  id: string;
  date: string;
  user_id: string;
  start_time: string;
  end_time: string;
  client_name: string;
  recurrence?: {
    frequency: string;
    interval: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
