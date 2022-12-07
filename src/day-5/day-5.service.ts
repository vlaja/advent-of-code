import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

type ChallengeData = [Record<number, string[]>, number[][]];

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
        (_row, character) => (_row = character.match(/.{1,4}/g) || []),
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
      const index = i + 1;
      !acc[index]
        ? (acc[index] = [cur[i]])
        : [cur[i], acc[index].unshift(cur[i])];

      acc[index] = acc[index].filter((item) => item && !Number(item));
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

  private _getKeyword(positions: Record<number, string[]>) {
    return Object.values(positions)
      .map((val) => val.pop() || ' ')
      .join('')
      .replace(/[(\[+)(\]+)]/gm, '');
  }

  private _moveCrates(
    [positions, instructions]: ChallengeData,
    order: 'baseline' | 'reverse',
  ) {
    for (const instruction of instructions) {
      const [amount, from, to] = instruction;
      const elementsToMove = positions[from].slice(-amount);
      if (order === 'reverse') elementsToMove.reverse();

      positions[to] = [...positions[to], ...elementsToMove];
      positions[from] = positions[from].slice(0, -amount);
    }

    return positions;
  }

  solveFirstPart() {
    return this._processInput().pipe(
      map((data: ChallengeData) => this._moveCrates(data, 'reverse')),
      map(this._getKeyword),
    );
  }
  solveSecondPart() {
    return this._processInput().pipe(
      map((data: ChallengeData) => this._moveCrates(data, 'baseline')),
      map(this._getKeyword),
    );
  }
}
