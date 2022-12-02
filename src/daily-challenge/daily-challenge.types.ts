import { Observable } from 'rxjs';

export type DailyChallenge = 'day-1';

export interface IDailyChallengeService {
  solveChallenge: () => Observable<unknown>;
}
