import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

@Injectable()
export class Day6Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(6)
      .pipe(map(this._processData));
  }

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data
      .trimEnd()
      .split('')
      .reduce(
        (acc: { signal: string; markers: number[] }, cur) => {
          acc.signal = acc.signal + cur;
          const lastFour = acc.signal.slice(-4).split('');
          const areLastFourUnique = [...new Set(lastFour)].length === 4;
          if (areLastFourUnique) acc.markers.push(acc.signal.length);
          return acc;
        },
        {
          signal: '',
          markers: [],
        },
      );
  };

  solveFirstPart() {
    return this._processInput().pipe(map((data) => data.markers[0]));
  }
  solveSecondPart() {
    return this._processInput().pipe(map((data) => console.log(data)));
  }
}
