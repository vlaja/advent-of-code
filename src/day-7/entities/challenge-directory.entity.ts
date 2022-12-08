import { ChallengeFile } from './challenge-file.entity';

export interface ChallengeDirectory {
  path: string;
  directories: ChallengeDirectory[];
  files: ChallengeFile[];
  size: number;
}

export class ChallengeDirectory {
  constructor(path: string) {
    this.path = path;
    this.directories = [];
    this.files = [];
    this.size = 0;
  }

  createDirectory(path: string) {
    const newDirectory = new ChallengeDirectory(path);
    this.directories.push(newDirectory);
    return newDirectory;
  }

  createFile(path: string, size: number) {
    this.files.push(new ChallengeFile(path, size));
    this.size += size;
  }
}
