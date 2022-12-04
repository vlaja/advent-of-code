import { Observable } from 'rxjs';

export type DailyChallenge = 'day-1';

export interface IDailyChallengeService {
  solveFirstPart: () => Observable<unknown>;
  solveSecondPart: () => Observable<unknown>;
}
