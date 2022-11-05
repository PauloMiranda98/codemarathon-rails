export enum ProblemStatus {
  NOT_TRIED, TRIED, UPSOLVING, ACCEPT, 
}

export type Problem = {
  contestId: number,
  index: string;
  name: string;
  status: ProblemStatus;
}
