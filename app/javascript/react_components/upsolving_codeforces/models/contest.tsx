import { Problem } from "../models/problem";

export type Contest = {
  contestId: number;
  contestName: string;
  members: Array<string>;
  problemList: Array<Problem>;
}

export enum ParticipantType {
  CONTESTANT = "CONTESTANT",
  PRACTICE = "PRACTICE",
  VIRTUAL = "VIRTUAL",
  MANAGER = "MANAGER",
  OUT_OF_COMPETITION = "OUT_OF_COMPETITION",
}