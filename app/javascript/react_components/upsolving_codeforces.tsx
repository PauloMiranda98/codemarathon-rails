import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Tooltip } from "flowbite-react";
import { CodeforcesApi } from "./codeforces_api";

enum ParticipantType {
  CONTESTANT = "CONTESTANT", 
  PRACTICE = "PRACTICE", 
  VIRTUAL = "VIRTUAL", 
  MANAGER = "MANAGER",
  OUT_OF_COMPETITION = "OUT_OF_COMPETITION",
}

enum ProblemColors {
  NOT_TRIED = "bg-gray-700 hover:bg-gray-800", 
  TRIED = "bg-red-700 hover:bg-red-800", 
  UPSOLVING = "bg-blue-700 hover:bg-blue-800",
  ACCEPT = "bg-green-700 hover:bg-green-800"
}

enum ProblemStatus {
  NOT_TRIED, TRIED, UPSOLVING, ACCEPT, 
}

type ProblemModel = {
  contestId: number,
  index: string;
  name: string;
  status: ProblemStatus;
}

type ContestModel = {
  contestId: number;
  subtitle: string;
  contestName: string;
  problemList: Array<ProblemModel>;
}

class Contest extends React.Component<ContestModel> {
  getUrl(contestId: number, index: string){
    if (contestId < 100000) {
      return `https://codeforces.com/contest/${contestId}/problem/${index}`;
    } else {
      return `https://codeforces.com/gym/${contestId}/problem/${index}`;
    }
  }

  getColor(status: ProblemStatus){
    switch(status){
      case ProblemStatus.NOT_TRIED:
        return ProblemColors.NOT_TRIED;
      case ProblemStatus.TRIED:
        return ProblemColors.TRIED;
      case ProblemStatus.UPSOLVING:
        return ProblemColors.UPSOLVING;
      case ProblemStatus.ACCEPT:
        return ProblemColors.ACCEPT;
      default:
        return ""
    }
  }

  render() {
    return (
      <div className="my-4">
        <h2 className="text-2xl font-bold text-center">
          {this.props.contestName}
        </h2>

        <h2 className="text-md text-center">
          {this.props.subtitle}
        </h2>

        <ul className="flex flex-wrap justify-center gap-2 my-2">
          {this.props.problemList.map((problem) => (
            <li key={problem.index}>
              <Tooltip content={problem.name} placement="bottom">
                <a href={this.getUrl(problem.contestId, problem.index)} target="_blank" rel="noopener noreferrer">
                  <button className= {"w-12 h-12 " + this.getColor(problem.status) + " text-white shadow-md text-xl focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg"}>
                    {problem.index}
                  </button>
                </a>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function isParticipationInTraining(type: ParticipantType): boolean {
  return (type == ParticipantType.CONTESTANT) ||
         (type == ParticipantType.VIRTUAL) ||
         (type == ParticipantType.OUT_OF_COMPETITION);
}

function mapperToContest(handle, party, standings){
  let contest: ContestModel = {
    contestId: 0,
    contestName: "",
    subtitle: "",
    problemList: []
  };

  let firstParty = standings.rows[0] || party;

  contest.contestId = standings.contest.id;
  contest.contestName = standings.contest.name;
  contest.problemList = standings.problems.map((problem: any): ProblemModel => {
    return {
      contestId: standings.contest.id,
      index: problem.index,
      name: problem.name,
      status: ProblemStatus.NOT_TRIED
    }
  });

  if(firstParty.teamName != null){
    let memberNames = firstParty.members.map((m) => m.handle).join(", ");
    contest.subtitle = `${firstParty.teamName}: ${memberNames}`
  }else{
    contest.subtitle = `Individual: ${handle}`;
  }

  for(const row of standings.rows){
    for(let p=0; p < row.problemResults.length; p++){
      let problemResult = row.problemResults[p];
      let currentStatus = contest.problemList[p].status;

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

  return contest;
}


type AppState = {
  handleInput: string,
  participantTypeInput: Object,

  handle: string,
  participantType: Object,

  partyList: Array<any>,
  contestList: Array<ContestModel>,
  contestListSize: number,

  currentPage: number,
  pageSize: number,
  totalPages: number,
};

class App extends React.Component<{}, AppState> {
  codeforcesApi = new CodeforcesApi();

  state = {
    handleInput: "",
    participantTypeInput: {
      CONTESTANT: true,
      PRACTICE: true,
      VIRTUAL: true,
      MANAGER: true,
      OUT_OF_COMPETITION: true,
    },

    handle: "",
    participantType: {},

    partyList: [],
    contestList: [],
    contestListSize: 0,

    currentPage: -1,
    pageSize: 8,
    totalPages: -1,
  };

  onChangeHandle = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ handleInput: e.currentTarget.value });
  };
  
  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    this.resetStates();
    this.requestSubmissionList(this.state.handleInput);
  };

  resetStates = (): void => {
    this.setState({
      handle: this.state.handleInput,
      participantType: this.state.participantTypeInput,
      contestList: [], 
      contestListSize: 0, 
      partyList: [],
      currentPage: -1,
      totalPages: -1,
    });
  }


  requestSubmissionList = (handle: string): void => {
    this.codeforcesApi.getSubmissions(handle).then((data: any) => {
      this.updatePartyList(data.result);
    });
  }

  updatePartyList = (submissions: any) => {
    let partySet: Set<Number> = new Set();
    let partyList: Array<any> = [];
    
    for (const submission of submissions) {
      let contestId = submission.contestId;
      
      if(!partySet.has(contestId) && this.hasValidParticipantType(submission.author.participantType)) {
        partySet.add(contestId)
        partyList.push(submission.author);
      }
    }

    this.setState({
      partyList: partyList,
      currentPage: 1,
      totalPages: this.paginateSize(partyList)
    });

    this.updateContestList(1, partyList);
  }

  updateContestList = (pageNumber: number, partyList: Array<any>) => {
    const currentPartyList = this.paginate(partyList, pageNumber, this.state.pageSize);
    
    this.setState({
      contestList: [],
      contestListSize: currentPartyList.length
    })

    currentPartyList.forEach((party) => {
      return this.codeforcesApi.getStandings(this.state.handle, party.contestId)
        .then((data: any) => {
          let contest = mapperToContest(this.state.handle, party, data.result);

          this.setState((state, props) => ({
            contestList: [...state.contestList, contest]
          }));
        });
      });
  }

  hasValidParticipantType = (participantType: string): boolean => {
    return this.state.participantType[participantType]
  }

  paginateSize = (array: Array<any>): number => {
    return Math.ceil(array.length / this.state.pageSize);
  }

  paginate = (array: Array<any>, pageNumber: number, pageSize: number): Array<any> => {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    return array.slice(start, end);
  }

  getLegends = (hasContets: boolean) => {
    if(hasContets)
      return (
        <div>
          <div className="flex flex-col md:flex-row justify-center gap-1 my-4">
            <span className="bg-gray-700 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
              Não foi tentado
            </span>
            <span className="bg-red-700 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
              Foi tentado mas não foi resolvido
            </span>
            <span className="bg-green-700 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
            Resolvido durante a competição
            </span>
            <span className="bg-blue-700 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
              Resolvido após a competição
            </span>
          </div>
          <div>
          </div>
        </div>
      )
    else
      return null;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    this.setState((prevState: AppState) => {
      let participantType = prevState.participantTypeInput;
      participantType[key] = e.target.checked;

      return {participantTypeInput: participantType};
    });
  }

  filter = () => {
    return (
      <div>
        <h3 className="my-4 font-semibold text-gray-900 dark:text-white">Considerar apenas</h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          { 
            Object.keys(this.state.participantTypeInput).map((key) => (
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input id={key} type="checkbox" checked={this.state.participantTypeInput[key]} onChange={(e) => this.handleChange(e, key)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                  <label htmlFor={key} className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{key}</label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  progressBar = () => {
    if(this.state.contestListSize == 0)
      return null;
    
    const percetage = (this.state.contestList.length*100) / this.state.contestListSize

    return (
      <div className="my-1 w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${percetage}%`}}>
          {percetage > 15 ? `${percetage}%` : "..."}
        </div>
      </div>
    );
  }

  loadPagination = () => {
    if(this.state.totalPages <= 1)
      return null;
    const currentPage = this.state.currentPage;

    let pages: Array<number> = [];
    if(this.state.totalPages <= 8){
      for(let i = 1; i <= this.state.totalPages; i++)
        pages.push(i);
    } else {
      pages = pages.concat([1, 2]);

      if(currentPage - 1 >= 4)
        pages.push(-1);
      
      for(let i = currentPage-1; i <= currentPage + 1; i++)
        if(i > 2 && i < this.state.totalPages - 1)
          pages.push(i);

      if(currentPage + 1 < this.state.totalPages - 2)
        pages.push(-1);
  
      pages = pages.concat([this.state.totalPages - 1, this.state.totalPages]);
    }

    return (
      <nav>
        <ul className="inline-flex -space-x-px">
          <li>
            <button aria-disabled={currentPage == 1} onClick={() => this.onPageChange(currentPage - 1)} className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Voltar</button>
          </li>
          {
            pages.map((page: number): JSX.Element => {
              if(page == -1){
                return (
                  <li>
                    <button disabled className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</button>
                  </li>
                )
              }else if (page == this.state.currentPage){
                return(
                  <li>
                    <button aria-current="page" disabled={currentPage == 1} className="py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</button>
                  </li>
                )
              }else{
                return(
                  <li>
                    <button onClick={() => this.onPageChange(page)} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</button>
                  </li>
                )  
              }
            })
          }
          <li>
            <button disabled={currentPage == this.state.totalPages} onClick={() => this.onPageChange(currentPage + 1)} className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Avançar</button>
          </li>
        </ul>
      </nav>
    );
  }

  onPageChange = (page: number) => {
    this.setState({currentPage: page});

    this.updateContestList(page, this.state.partyList);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="codeforces-handle" value={this.state.handleInput} onChange={this.onChangeHandle} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite seu handle do Codeforces" required/>
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Buscar
            </button>
          </div>

          {this.progressBar()}

          {this.filter()}
        </form>

        {this.getLegends(this.state.contestList.length > 0)}

        <div>
          {
            this.state.contestList.map((contest: ContestModel) => (
              <div>
                <hr className="my-8 h-px bg-gray-200 border-0"></hr>
                <Contest 
                  key={contest.contestId} 
                  contestId={contest.contestId} 
                  subtitle={contest.subtitle} 
                  contestName={contest.contestName} 
                  problemList={contest.problemList} 
                />
              </div>
            ))
          }
        </div>

        <div className="flex items-center justify-center text-center">
          {this.loadPagination()}
        </div>
      </div>
    );
  }
}

document.addEventListener("turbo:load", () => {
  const rootEl = document.getElementById("upsolving-codeforces-component");

  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
  }
});