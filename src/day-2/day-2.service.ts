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
  HandSymbols,
  Outcome,
  PlayerSymbols,
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
      .map((symbolPairs: SymbolPair) => symbolPairs.split(' '));
  };

  private _getHandFromSymbol(symbol: HandSymbols): Hand {
    if (symbol === 'A' || symbol === 'X') return 'Rock';
    if (symbol === 'B' || symbol === 'Y') return 'Paper';
    if (symbol === 'C' || symbol === 'Z') return 'Scissors';
    throw new Error('Invalid symbol');
  }

  private _getOutcomeFromSymbol(symbol: PlayerSymbols): Outcome {
    if (symbol === 'X') return 'Lose';
    if (symbol === 'Y') return 'Draw';
    if (symbol === 'Z') return 'Win';
    throw new Error('Invalid symbol');
  }

  private _getPlayerHandFromOutcome(
    outcome: Outcome,
    opponentHand: Hand,
  ): Hand {
    const winningHand = Object.keys(WinningConditionsMap).find(
      (key: Hand) => WinningConditionsMap[key] === opponentHand,
    );

    if (outcome === 'Win') return winningHand as Hand;
    if (outcome === 'Draw') return opponentHand;
    if (outcome === 'Lose') return WinningConditionsMap[opponentHand];
    throw new Error('Invalid symbol');
  }

  private _getGameOutcome([opponentHand, playerHand]: [Hand, Hand]): [
    Hand,
    Outcome,
  ] {
    if (WinningConditionsMap[playerHand] === opponentHand) {
      return [playerHand, 'Win'];
    }

    if (playerHand === opponentHand) {
      return [playerHand, 'Draw'];
    }

    return [playerHand, 'Lose'];
  }

  private _calculatePoints(
    acc: number,
    [playerHand, outcome]: [Hand, Outcome],
  ): number {
    return (acc += HandValue[playerHand] + OutcomeValue[outcome]);
  }

  private _useTacticalGuide = (symbolTuples: SymbolTuple[]) =>
    symbolTuples
      .map((tuple) => tuple.map(this._getHandFromSymbol))
      .map(this._getGameOutcome)
      .reduce(this._calculatePoints, 0);

  private _useTopSecretTacticalGuide = (symbolTuples: SymbolTuple[]) =>
    symbolTuples
      .map(([opponentSymbol, playerSymbol]) => [
        this._getHandFromSymbol(opponentSymbol),
        this._getOutcomeFromSymbol(playerSymbol),
      ])
      .map(([opponentHand, desiredOutcome]: [Hand, Outcome]) => [
        opponentHand,
        this._getPlayerHandFromOutcome(desiredOutcome, opponentHand),
      ])
      .map(this._getGameOutcome)
      .reduce(this._calculatePoints, 0);

  solveFirstPart() {
    return this._processInput().pipe(map(this._useTacticalGuide));
  }

  solveSecondPart() {
    return this._processInput().pipe(map(this._useTopSecretTacticalGuide));
  }
}
