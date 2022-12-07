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

  private _areLastNUnique = (signal: string) => (n: number) =>
    [...new Set(signal.slice(-n).split(''))].length === n;

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data
      .trimEnd()
      .split('')
      .reduce(
        (
          acc: {
            signal: string;
            packetMarkers: number[];
            messageMarkers: number[];
          },
          cur,
        ) => {
          acc.signal = acc.signal + cur;
          const uniqueCharacters = this._areLastNUnique(acc.signal);
          if (uniqueCharacters(4)) {
            acc.packetMarkers.push(acc.signal.length);
          }

          if (uniqueCharacters(14)) {
            acc.messageMarkers.push(acc.signal.length);
          }

          return acc;
        },
        {
          signal: '',
          packetMarkers: [],
          messageMarkers: [],
        },
      );
  };

  solveFirstPart() {
    return this._processInput().pipe(map((data) => data.packetMarkers[0]));
  }
  solveSecondPart() {
    return this._processInput().pipe(map((data) => data.messageMarkers[0]));
  }
}
