export interface ChallengeFile {
  name: string;
  size: number;
}

export class ChallengeFile {
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}
