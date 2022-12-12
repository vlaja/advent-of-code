import { ChallengeDirectory } from './challenge-directory.entity';
import { ChallengeFile } from './challenge-file.entity';

export interface ChallengeFileSystem {
  rootDirectory: ChallengeDirectory;
  currentDirectory: ChallengeDirectory;
  currentDirectoryPath: string;
  paths: Record<string, ChallengeDirectory | ChallengeFile>;
  size: number;
}

export class ChallengeFileSystem {
  constructor(rootPath: string) {
    this.rootDirectory = new ChallengeDirectory(rootPath);
    this.paths = { [rootPath]: this.rootDirectory };
    this.currentDirectory = this.rootDirectory;
    this.currentDirectoryPath = rootPath;
    this.size = 0;
  }

  private _getPreviousDirectoryFromPath(path: string) {
    return path.split('/').slice(0, -1).join('/');
  }

  private _isDirectory(
    pathElement: ChallengeDirectory | ChallengeFile,
  ): pathElement is ChallengeDirectory {
    return (pathElement as ChallengeDirectory).directories !== undefined;
  }

  private _mergeCreationResult(
    absolutePath: string,
    element: ChallengeDirectory | ChallengeFile,
  ) {
    this.size += element.size;
    this.paths[absolutePath] = element;
  }

  private _getAbsolutePath(name: string) {
    const rootDir = this.rootDirectory.name;
    if (name === rootDir) return rootDir;

    let path = this.currentDirectoryPath;
    path += path === '/' ? name : `/${name}`;
    return path;
  }

  goBack() {
    const previousPath =
      this._getPreviousDirectoryFromPath(this.currentDirectoryPath) ||
      this.rootDirectory.name;

    const element = this.paths[previousPath];
    if (this._isDirectory(element)) {
      this.currentDirectoryPath = previousPath;
      this.currentDirectory = element;
      this.currentDirectory.size += this.currentDirectory.directories.reduce(
        (acc, curr) => acc + curr.size,
        0,
      );
    }
  }

  changeDirectory(name: string) {
    const absolutePath = this._getAbsolutePath(name);
    const element = this.paths[absolutePath];
    if (this._isDirectory(element)) {
      this.currentDirectory = element;
    }

    this.currentDirectoryPath = absolutePath;
  }

  createDirectory(name: string) {
    this._mergeCreationResult(
      this._getAbsolutePath(name),
      this.currentDirectory.createDirectory(name),
    );
  }

  createFile(name: string, size: number) {
    this._mergeCreationResult(
      this._getAbsolutePath(name),
      this.currentDirectory.createFile(name, size),
    );
  }

  getPathValuePairs() {
    return Object.entries(this.paths).filter(
      (path): path is [string, ChallengeDirectory] =>
        this._isDirectory(path[1]),
    );
  }

  getBigDirectories() {
    const maxSize = 100000;
    const bigFolders = this.getPathValuePairs()
      .filter(([, entry]) => entry.size <= maxSize)
      .map(([path]) => path)
      .reduce((acc, path) => {
        const hasMatchingRoot = acc.find((p) => path.includes(p));
        if (!acc.length || !hasMatchingRoot) acc.push(path);
        return acc;
      }, new Array<string>());

    return Object.entries(this.paths)
      .filter(([path]) => bigFolders.includes(path))
      .reduce((acc, [, entry]) => acc + entry.size, 0);
  }
}
