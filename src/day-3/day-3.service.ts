import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';

@Injectable()
export class Day3Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private lowPriority = this.alphabet.split('');
  private highPriority = this.alphabet.toUpperCase().split('');

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(3)
      .pipe(map(this._processData));
  }

  private _splitCompartments = (rucksack: string): [string[], string[]] => {
    const half = Math.floor(rucksack.length / 2);
    return [rucksack.slice(0, half).split(''), rucksack.slice(half).split('')];
  };

  private _findMatchingCharacter = ([left, right]: [string[], string[]]) =>
    left.find((item) => right.includes(item)) || '';

  private _calculatePoints = (character: string) => {
    const value = this.lowPriority.indexOf(character) + 1;
    if (value) return value;
    return this.lowPriority.length + this.highPriority.indexOf(character) + 1;
  };

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data
      .trimEnd()
      .split('\n')
      .map(this._splitCompartments)
      .map(this._findMatchingCharacter)
      .map(this._calculatePoints);
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map((data) => data.reduce((acc, cur) => acc + cur, 0)),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(map(console.log));
  }
}
