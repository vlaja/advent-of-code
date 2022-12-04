import { Hand, HandSymbols, Outcome, WinningConditions } from './day-2.types';

export const HandValue: Record<Hand, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

export const OutcomeValue: Record<Outcome, number> = {
  Lose: 0,
  Draw: 3,
  Win: 6,
};

export const HandSymbolsMap: HandSymbols = {
  Rock: ['A', 'X'],
  Paper: ['B', 'Y'],
  Scissors: ['C', 'Z'],
};

export const WinningConditionsMap: WinningConditions = {
  Rock: 'Scissors',
  Paper: 'Rock',
  Scissors: 'Paper',
};
