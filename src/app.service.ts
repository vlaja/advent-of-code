import { Injectable } from '@nestjs/common';
import { DailyChallenge } from './daily-challenge/daily-challenge.types';
import { Day1Service } from './day-1/day-1.service';

@Injectable()
export class AppService {
  constructor(private readonly dayOneService: Day1Service) {}

  solveDailyChallenge(day: DailyChallenge) {
    console.log(day);
    switch (day) {
      case 'day-1':
        return this.dayOneService.solveChallenge();
    }
  }
}
