import { Hand, Outcome } from './day-2.types';

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

export const WinningConditionsMap: Record<Hand, Hand> = {
  Rock: 'Scissors',
  Paper: 'Rock',
  Scissors: 'Paper',
};
