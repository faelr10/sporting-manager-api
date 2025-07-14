import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IScheduleService } from './structure';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(ScheduleService) private readonly scheduleService: IScheduleService,
  ) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.scheduleService.getAllSchedules();
  }

  //   @Get(':id')
  //   async getById(@Param('id') id: string) {
  //     return this.scheduleService.getScheduleById(id);
  //   }
}
