import { Inject, Injectable } from '@nestjs/common';
import { IDailyChallengeService } from './daily-challenge/daily-challenge.types';

@Injectable()
export class AppService {
  constructor(
    @Inject('DailyServices')
    private readonly services: IDailyChallengeService[],
  ) {}

  private _getServicePart(part: number, service: IDailyChallengeService) {
    switch (part) {
      case 1:
        return service.solveFirstPart();
      case 2:
        return service.solveSecondPart();
    }
  }

  solveDailyChallenge(day: string, part: string) {
    const challengePart = parseInt(part);
    const dailyService = this.services[parseInt(day) - 1];
    return this._getServicePart(challengePart, dailyService);
  }
}
