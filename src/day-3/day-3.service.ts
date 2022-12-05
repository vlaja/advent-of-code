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

  private _splitCompartments = (rucksack: string): string[] => {
    const half = Math.floor(rucksack.length / 2);
    return [rucksack.slice(0, half), rucksack.slice(half)];
  };

  private _splitGroups = (rucksacks: string[], chunkSize: number) =>
    [...Array(Math.ceil(rucksacks.length / chunkSize))].map(() =>
      rucksacks.splice(0, chunkSize),
    );

  private _findDuplicateCharacters = (characters: string[]) => {
    const result = characters.reduce(
      (acc: Record<string, number>, cur: string) => {
        const curArr = [...new Set(cur.split(''))];
        curArr.forEach((char) => (acc[char] = (acc[char] || 0) + 1));
        return acc;
      },
      {},
    );

    const [matchingLetter] = Object.keys(result).sort(
      (a, b) => result[b] - result[a],
    );

    return matchingLetter;
  };

  private _calculatePoints = (character: string) => {
    const value = this.lowPriority.indexOf(character) + 1;
    if (value) return value;
    return this.lowPriority.length + this.highPriority.indexOf(character) + 1;
  };

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data.trimEnd().split('\n');
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map((data) =>
        data
          .map(this._splitCompartments)
          .map(this._findDuplicateCharacters)
          .map(this._calculatePoints)
          .reduce((acc, cur) => acc + cur, 0),
      ),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(
      map((data) =>
        this._splitGroups(data, 3)
          .map(this._findDuplicateCharacters)
          .map(this._calculatePoints)
          .reduce((acc, cur) => acc + cur, 0),
      ),
    );
  }
}
