import { Contest, ParticipantType } from "../models/contest";
import { Problem, ProblemStatus } from "../models/problem";

function isParticipationInTraining(type: ParticipantType): boolean {
  return (type == ParticipantType.CONTESTANT) ||
         (type == ParticipantType.VIRTUAL) ||
         (type == ParticipantType.OUT_OF_COMPETITION);
}

export class ContestFactory {
  static createContest(contestId: number, contestName: string, members: Array<string>, problemList: Array<Problem>): Contest {
    return {
      contestId: contestId,
      contestName: contestName,
      members: members,
      problemList: problemList
    }
  }

  static createContestByContestStandingsJson(standings: any): Contest {
    let contest: Contest = {
      contestId: 0,
      contestName: "",
      members: [],
      problemList: []
    };
  
    contest.contestId = standings.contest.id;
    contest.contestName = standings.contest.name;
    contest.problemList = standings.problems.map((problem: any): Problem => {
      return {
        contestId: standings.contest.id,
        index: problem.index,
        name: problem.name,
        status: ProblemStatus.NOT_TRIED
      }
    });
    
    let memberSet = new Set<string>();
  
    for(const row of standings.rows){
      for(let p=0; p < row.problemResults.length; p++){
        let problemResult = row.problemResults[p];
        let currentStatus = contest.problemList[p].status;
  
        row.party.members.forEach((member) => {
          memberSet.add(member.handle);
        })
  
        if(currentStatus == ProblemStatus.ACCEPT)
          continue
        
        if(problemResult.points > 0 && isParticipationInTraining(row.party.participantType)){
          contest.problemList[p].status = ProblemStatus.ACCEPT;
          continue;
        }
  
        if(currentStatus == ProblemStatus.UPSOLVING)
          continue;
  
        if(problemResult.points > 0){
          contest.problemList[p].status = ProblemStatus.UPSOLVING;
          continue;
        }
  
        if(problemResult.rejectedAttemptCount > 0){
          contest.problemList[p].status = ProblemStatus.TRIED;
          continue;
        }
      }
    }
  
    contest.members = Array.from(memberSet);
  
    return contest;  
  }
}