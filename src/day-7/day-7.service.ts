import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';
import { ChallengeFileSystem } from './entities/challenge-file-system.entity';

@Injectable()
export class Day7Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(7)
      .pipe(map(this._processData));
  }

  private _createFileSystem = (
    fileSystem: ChallengeFileSystem,
    instruction: string[],
  ) => {
    const [cmdOrSize, name] = instruction;
    if (cmdOrSize === 'cd') {
      name == '..' ? fileSystem.goBack() : fileSystem.changeDirectory(name);
    }

    if (cmdOrSize === 'dir') {
      fileSystem.createDirectory(name);
    }

    const fileSize = parseInt(cmdOrSize);
    if (fileSize) {
      fileSystem.createFile(name, fileSize);
    }

    return fileSystem;
  };

  private _processData = (response: AxiosResponse<string, string>) =>
    response.data
      .split('\n')
      .map((item) => item.replace('$ ', ''))
      .map((item) => item.split(' '))
      .filter(([cmd]) => cmd !== 'ls')
      .reduce(this._createFileSystem, new ChallengeFileSystem('/'));

  solveFirstPart() {
    return this._processInput().pipe(
      map((data) => data.getBigDirectories()),
      map((dirs) => dirs.reduce((acc, entry) => acc + entry.size, 0)),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(
      map((data) => data.getNextDirectoryToDelete()),
      map((folder) => folder.size),
    );
  }
}
