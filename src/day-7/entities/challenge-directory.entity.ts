import { ChallengeFile } from './challenge-file.entity';

export interface ChallengeDirectory {
  name: string;
  directories: ChallengeDirectory[];
  files: ChallengeFile[];
  size: number;
}

export class ChallengeDirectory {
  constructor(name: string) {
    this.name = name;
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
    const newFile = new ChallengeFile(path, size);
    this.files.push(newFile);
    this.size += size;
    return newFile;
  }
}
