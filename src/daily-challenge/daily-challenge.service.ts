import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

interface IDailyChallengeService {
  getDailyChallengeInput(
    day: number,
  ): Observable<AxiosResponse<string, string>>;
}

@Injectable()
export class DailyChallengeService implements IDailyChallengeService {
  private _base_url = 'https://adventofcode.com';
  private _aoc_session_token = process.env.AOC_SESSION_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  private _getBaseUrl(day: number): string {
    const currentYear = new Date().getFullYear();
    return `${this._base_url}/${currentYear}/day/${day}/input`;
  }

  getDailyChallengeInput(
    day: number,
  ): Observable<AxiosResponse<string, string>> {
    return this.httpService.get(this._getBaseUrl(day), {
      headers: {
        Cookie: `session=${this._aoc_session_token}`,
      },
    });
  }
}
