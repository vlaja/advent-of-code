import { ChallengeDirectory } from './challenge-directory.entity';

export interface ChallengeFileSystem {
  rootDirectory: ChallengeDirectory;
  currentDirectory: ChallengeDirectory;
  paths: Record<string, ChallengeDirectory>;
}

export class ChallengeFileSystem {
  constructor(rootPath: string) {
    this.rootDirectory = new ChallengeDirectory(rootPath);
    this.paths = { [rootPath]: this.rootDirectory };
    this.currentDirectory = this.rootDirectory;
  }

  // changeDirectory(path: string) {
  //   if (path === this.rootDirectory.path) {
  //     this.currentDirectory = this.rootDirectory;
  //     return;
  //   }

  //   if (path === '..') {
  //     // console.log(path);
  //   }

  //   if (this.paths[path]) {
  //     this.currentDirectory = this.paths[path];
  //   } else {
  //     const directory = this.currentDirectory.directories.find(
  //       (dir) => dir.path === path,
  //     );

  //     if (directory) {
  //       this.currentDirectory = directory;
  //       this.paths[path] = directory;
  //     }
  //   }
  // }
}
