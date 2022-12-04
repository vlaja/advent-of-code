export type Hand = 'Rock' | 'Paper' | 'Scissors';

export type OpponentSymbols = 'A' | 'B' | 'C';

export type PlayerSymbols = 'X' | 'Y' | 'Z';

export type HandSymbols = OpponentSymbols | PlayerSymbols;

export type Outcome = 'Draw' | 'Win' | 'Lose';

export type OpponentSymbolMap<H extends Hand> = H extends 'Rock'
  ? 'A'
  : H extends 'Paper'
  ? 'B'
  : H extends 'Scissors'
  ? 'C'
  : never;

export type PlayerSymbolMap<H extends Hand> = H extends 'Rock'
  ? 'X'
  : H extends 'Paper'
  ? 'Y'
  : H extends 'Scissors'
  ? 'Z'
  : never;

export type SymbolPair = `${OpponentSymbolMap<Hand>} ${PlayerSymbolMap<Hand>}`;

export type SymbolTuple = [OpponentSymbolMap<Hand>, PlayerSymbolMap<Hand>];
