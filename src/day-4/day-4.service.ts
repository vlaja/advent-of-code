import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

@Injectable()
export class Day4Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(4)
      .pipe(map(this._processData));
  }

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data.trimEnd().split('\n');
  };

  solveFirstPart() {
    return this._processInput().pipe(map((data) => console.log(data)));
  }

  solveSecondPart() {
    return this._processInput().pipe(map((data) => console.log(data)));
  }
}
