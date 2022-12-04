import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';
import {
  HandValue,
  OutcomeValue,
  WinningConditionsMap,
} from './day-2.constants';
import {
  Hand,
  HandSymbol,
  Outcome,
  SymbolPair,
  SymbolTuple,
} from './day-2.types';

@Injectable()
export class Day2Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(2)
      .pipe(map(this._processData));
  }

  private _processData = (response: AxiosResponse<string, string>) => {
    return response.data
      .trimEnd()
      .split('\n')
      .map((symbolPairs: SymbolPair) => symbolPairs.split(' '))
      .map(this._getGameScore);
  };

  private _getHandFromSymbol(symbol: HandSymbol): Hand {
    if (symbol === 'A' || symbol === 'X') return 'Rock';
    if (symbol === 'B' || symbol === 'Y') return 'Paper';
    if (symbol === 'C' || symbol === 'Z') return 'Scissors';
    return 'Rock';
  }

  private _getGameOutcome(opponentHand: Hand, playerHand: Hand): Outcome {
    if (WinningConditionsMap[playerHand] === opponentHand) return 'Win';
    if (opponentHand === playerHand) return 'Draw';
    return 'Lose';
  }

  private _getGameScore = (item: SymbolTuple) => {
    const [opponentHand, playerHand] = item.map(this._getHandFromSymbol);
    const gameOutcome = this._getGameOutcome(opponentHand, playerHand);
    return HandValue[playerHand] + OutcomeValue[gameOutcome];
  };

  solveFirstPart() {
    return this._processInput().pipe(
      map((data) => data.reduce((acc, cur) => (acc += cur), 0)),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(map(([topCaloryCount]) => topCaloryCount));
  }
}
