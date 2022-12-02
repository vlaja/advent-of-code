import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DailyChallenge } from './daily-challenge/daily-challenge.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  day1(@Param('id') id: DailyChallenge) {
    return this.appService.solveDailyChallenge(id);
  }
}
