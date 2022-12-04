import { Injectable } from '@nestjs/common';
import { Day1Service } from './day-1/day-1.service';
import { Day2Service } from './day-2/day-2.service';

@Injectable()
export class AppService {
  constructor(
    private readonly day1Service: Day1Service,
    private readonly day2Service: Day2Service,
  ) {}

  solveDailyChallenge(day: string, part: string) {
    const numericPart = parseInt(part);
    switch (parseInt(day)) {
      case 1:
        return numericPart === 1
          ? this.day1Service.solveFirstPart()
          : this.day1Service.solveSecondPart();
      case 2:
        return numericPart === 1 ? this.day2Service.solveFirstPart() : null;
    }
  }
}
