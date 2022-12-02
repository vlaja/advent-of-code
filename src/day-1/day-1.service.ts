import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { IDailyChallengeService } from 'src/daily-challenge/daily-challenge.types';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';

@Injectable()
export class Day1Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _reduceElfCalories(acc: number[], cur: number) {
    const lastIndex = acc.length > 0 ? acc.length - 1 : 0;
    cur && acc[lastIndex] ? (acc[lastIndex] += cur) : acc.push(cur);
    return acc;
  }

  private _processInput() {
    return this.dailyChallengeService.getDailyChallengeInput(1);
  }

  private _processResponse = (response: AxiosResponse<string, string>) => {
    return response.data
      .split('\n')
      .map((val) => parseInt(val))
      .reduce(this._reduceElfCalories, [])
      .filter(Boolean)
      .sort((a, b) => b - a);
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map(this._processResponse),
      map(([topCaloryCount]) => topCaloryCount),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(
      map(this._processResponse),
      map((calories) =>
        calories.slice(0, 3).reduce((acc, cur) => (acc += cur), 0),
      ),
    );
  }
}
