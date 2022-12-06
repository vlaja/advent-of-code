import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

@Injectable()
export class Day5Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(5)
      .pipe(map(this._processData));
  }

  private _reduceRow(acc: string[][], cur: string, index: number) {
    acc[index] = cur
      .split('/t')
      .reduce(
        (row, character) => (row = character.match(/.{1,4}/g) || []),
        new Array<string>(),
      )
      .map((val) => val.trim());

    return acc;
  }

  private _flipColumnsAndRows = (
    acc: Record<number, string[]>,
    cur: string[],
  ) => {
    cur.forEach((_, i) => {
      !acc[i] ? (acc[i] = [cur[i]]) : acc[i].push(cur[i]);
      acc[i] = acc[i].filter((item) => item && !Number(item));
    });

    return acc;
  };

  private _tranformStartingPosition(position: string) {
    return position
      .trim()
      .split('\n')
      .reduce(this._reduceRow, new Array<string[]>())
      .reduce(this._flipColumnsAndRows, {});
  }

  private _tranformInstruction(instruction: string) {
    return instruction.split('\n').map((val) =>
      val
        .split(/[^\d.]+/gm)
        .filter(Boolean)
        .map(Number),
    );
  }

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data
      .trimEnd()
      .split(/^\n/gm)
      .map((val) =>
        val.startsWith('move')
          ? this._tranformInstruction(val)
          : this._tranformStartingPosition(val),
      );
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map(([positions, instructions]) => {
        console.log(positions);
        return [];
      }),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(map((assignmentPair) => assignmentPair));
  }
}
