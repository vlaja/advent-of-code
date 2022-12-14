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
    return response.data
      .trimEnd()
      .split('\n')
      .map((assignmentPairs: string) =>
        assignmentPairs
          .split(',')
          .map((pair) => pair.split('-').map((val) => +val)),
      );
  };

  private _getPositions(elfs: number[][]) {
    return elfs
      .map((arr) => {
        const [min, max] = arr;
        const keys = max - min;
        return [...Array(keys + 1).keys()].map((i) => i + min);
      })
      .sort((a, b) => b.length - a.length);
  }

  private _reducePositions(
    acc: number[],
    cur: number[],
    validator: (acc: number[], cur: number[]) => boolean,
  ) {
    if (!acc.length) {
      acc = cur;
      return acc;
    }

    if (!validator(acc, cur)) acc = [];
    return acc;
  }

  private _filterFullMatches = (positionSets: number[][]) => {
    const validator = (acc: number[], cur: number[]) =>
      cur.every((val) => acc.includes(val));

    return positionSets.reduce(
      (acc, cur) => this._reducePositions(acc, cur, validator),
      [],
    );
  };

  private _filterOverlaps = (positionSets: number[][]) => {
    const validator = (acc: number[], cur: number[]) =>
      cur.some((val) => acc.includes(val));

    return positionSets.reduce(
      (acc, cur) => this._reducePositions(acc, cur, validator),
      [],
    );
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map(
        (assignmentPair) =>
          assignmentPair
            .map(this._getPositions)
            .map(this._filterFullMatches)
            .filter((val) => val.length > 0).length,
      ),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(
      map(
        (assignmentPair) =>
          assignmentPair
            .map(this._getPositions)
            .map(this._filterOverlaps)
            .filter((val) => val.length > 0).length,
      ),
    );
  }
}
