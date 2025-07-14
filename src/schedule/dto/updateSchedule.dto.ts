import { IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  client_name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  start_time: string;

  @IsString()
  @IsOptional()
  end_time: string;

  @IsOptional()
  recurrence: {
    frequency: string;
    interval: number;
    count: number;
  };
}
