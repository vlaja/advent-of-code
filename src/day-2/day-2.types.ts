export type Hand = 'Rock' | 'Paper' | 'Scissors';

export type HandSymbol = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

export type Outcome = 'Draw' | 'Win' | 'Lose';

// export type Test = {
//   Rock: 'A' | 'X';
//   Paper: 'B' | 'Y';
//   Scissors: 'C' | 'Z';
// };

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

export type HandSymbols = {
  Rock: [OpponentSymbolMap<'Rock'>, PlayerSymbolMap<'Rock'>];
  Paper: [OpponentSymbolMap<'Paper'>, PlayerSymbolMap<'Paper'>];
  Scissors: [OpponentSymbolMap<'Scissors'>, PlayerSymbolMap<'Scissors'>];
};

export type SymbolPair = `${OpponentSymbolMap<Hand>} ${PlayerSymbolMap<Hand>}`;

export type SymbolTuple = [OpponentSymbolMap<Hand>, PlayerSymbolMap<Hand>];

export type Flattened<T> = T extends Array<infer U> ? Flattened<U> : T;

export type WinningConditions = {
  Rock: 'Scissors';
  Paper: 'Rock';
  Scissors: 'Paper';
};
