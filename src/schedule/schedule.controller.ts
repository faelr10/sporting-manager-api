import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IScheduleService } from './structure';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';
import { AuthGuard } from 'src/middleware/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: string) {
    return this.scheduleService.getSchedulesByUserId(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() params: UpdateScheduleDto) {
    return this.scheduleService.updateSchedule(id, params);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.scheduleService.deleteSchedule(id);
  }
}
