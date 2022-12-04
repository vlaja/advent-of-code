import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('day/:day/part/:part')
  day1(@Param('day') day: string, @Param('part') part: string) {
    return this.appService.solveDailyChallenge(day, part);
  }
}
