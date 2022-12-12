import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, reduce } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

@Injectable()
export class Day8Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(8)
      .pipe(map(this._processData));
  }

  private _processData = (response: AxiosResponse<string, string>) =>
    response.data.trimEnd().split('\n');

  private _mapTrees(data: string[]) {
    return data.map((line) => line.split('').map((char) => +char));
  }

  private _isVisibleInRow(tree: number, index: number, array: number[]) {
    /**
     * Zero height tree is never visible
     */
    if (!tree) return false;

    /**
     * First and last elements in a row are always visible if not 0
     */
    const isFirst = index === 0;
    const isLast = index === array.length - 1;
    if (isFirst || isLast) return true;

    /**
     * visible if bigger then both neighbours
     */
    if (tree > array[index - 1] && tree > array[index + 1]) {
      return true;
    }
  }

  private _reduceVisibleTrees = (acc: number, value: number[][]) =>
    (acc += value.reduce((_acc, _row, _rowIndex) => {
      if (_rowIndex === 0) {
        _acc += value[_rowIndex].filter(this._isVisibleInRow).length;
        return _acc;
      }

      if (_rowIndex === value.length - 1) {
        _acc += value[_rowIndex].filter(this._isVisibleInRow).length;
        return _acc;
      }

      const previousRow = value[_rowIndex - 1];
      const nextRow = value[_rowIndex + 1];
      _acc += value[_rowIndex].filter((item, index, arry) => {
        const visibleInRow = this._isVisibleInRow(item, index, arry);
        if (!visibleInRow) return false;
        return item > previousRow[index] && item > nextRow[index];
      }).length;

      return _acc;
    }, 0));

  solveFirstPart() {
    return this._processInput().pipe(
      map(this._mapTrees),
      reduce(this._reduceVisibleTrees, 0),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(
      map((data) => {
        console.log(data);
      }),
    );
  }
}
