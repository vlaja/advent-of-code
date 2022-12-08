import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { DailyChallengeService } from '../daily-challenge/daily-challenge.service';
import { IDailyChallengeService } from '../daily-challenge/daily-challenge.types';
import { ChallengeDirectory } from './entities/challenge-directory.entity';
import { ChallengeFileSystem } from './entities/challenge-file-system.entity';

@Injectable()
export class Day7Service implements IDailyChallengeService {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  private _processInput() {
    return this.dailyChallengeService
      .getDailyChallengeInput(7)
      .pipe(map(this._processData));
  }

  private _getPreviousDirectoryFromPath(path: string) {
    return path.split('/').slice(0, -1).join('/');
  }

  private _createFileSystem = (
    fileSystem: ChallengeFileSystem,
    instruction: string[],
  ) => {
    const [cmdOrSize, name] = instruction;
    let path = fileSystem.currentDirectory.path;
    if (name == '..') {
      path =
        this._getPreviousDirectoryFromPath(path) ||
        fileSystem.rootDirectory.path;
    }

    const fileSize = parseInt(cmdOrSize);
    if (fileSize) {
      fileSystem.currentDirectory.createFile(name, fileSize);
    }

    if (cmdOrSize === 'dir') {
      path = path === name ? name : `${path}/${name}`;
    }

    path = path.replace('//', '/');
    if (!fileSystem.paths[path]) {
      fileSystem.paths[path] = new ChallengeDirectory(path);
    }

    fileSystem.currentDirectory = fileSystem.paths[path];
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
      map((data) => {
        console.log(Object.keys(data.paths));
        return [];
      }),
    );
  }

  solveSecondPart() {
    return this._processInput().pipe(map((data) => console.log(data)));
  }
}
