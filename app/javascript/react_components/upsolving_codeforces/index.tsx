import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { CodeforcesApi } from "./codeforces_api";

import { ContestComponent } from "./components/contest_component";
import { ContestLegendComponent } from "./components/contest_legend_component";
import { PaginationComponent } from "./components/pagination_component";

import { Contest } from "./models/contest";
import { ContestFactory } from "./factories/contest_factory";

type AppState = {
  handleInput: string,
  participantTypeInput: Object,

  handle: string,
  participantType: Object,

  contestIdList: Array<number>,
  contestList: Array<Contest>,
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

    contestIdList: [],
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
    this.findSubmissionList(this.state.handleInput);
  };

  resetStates = (): void => {
    this.setState({
      handle: this.state.handleInput,
      participantType: this.state.participantTypeInput,

      contestIdList: [],
      contestList: [],
      contestListSize: 0,

      currentPage: -1,
      totalPages: -1,
    });
  }

  findSubmissionList = (handle: string): void => {
    this.codeforcesApi.getSubmissions(handle).then((data: any) : void => {
      this.updateContestIdList(data.result);
    });
  }

  updateContestIdList = (submissions: any) => {
    let contestIdSet: Set<number> = new Set();
    
    for (const submission of submissions) {
      let contestId = submission.contestId;
      
      if(!contestIdSet.has(contestId) && this.hasValidParticipantType(submission.author.participantType)) {
        contestIdSet.add(contestId)
      }
    }

    const contestIdList = Array.from(contestIdSet);

    this.setState({
      contestIdList: contestIdList,
      currentPage: 1,
      totalPages: this.paginateSize(contestIdList)
    });

    this.updateContestList(1, contestIdList);
  }

  updateContestList = (pageNumber: number, contestIdList: Array<number>) => {
    const currentContestIdList = this.paginate(contestIdList, pageNumber, this.state.pageSize);
    const temporaryContestId = currentContestIdList.map((contestId: number) => {
      return ContestFactory.createContest(
        contestId,
        `Carregando contest ${contestId} ...`,
        [],
        []
      );
    });

    this.setState({
      contestList: temporaryContestId,
      contestListSize: currentContestIdList.length
    })

    currentContestIdList.forEach((contestId) => {
      return this.codeforcesApi.getStandings(this.state.handle, contestId)
        .then((data: any) => {
          let contest = ContestFactory.createContestByContestStandingsJson(data.result);

          this.setState((prevState: AppState) => {
            let contestList = prevState.contestList;
            let index = contestList.findIndex((item) => item.contestId === contestId);

            if (index !== -1) {
              contestList[index] = contest;
            }

            return {contestList: contestList};
          });
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

  handleParticipantTypeChange = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
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
                  <input id={key} type="checkbox" checked={this.state.participantTypeInput[key]} onChange={(e) => this.handleParticipantTypeChange(e, key)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                  <label htmlFor={key} className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{key}</label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  codeforceApiLimitationAlert = () => {
    return (
      <div className="p-4 my-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
        A página pode demorar para carregar devido a uma limitação da API do Codeforces. 
        Só é possível fazer uma requisição a cada 2 segundos :(
      </div>
    );
  }

  onPageChange = (page: number) => {
    this.setState({currentPage: page});

    this.updateContestList(page, this.state.contestIdList);
  }

  render() {
    const helpers = (this.state.contestList.length > 0) ? <ContestLegendComponent/> : this.codeforceApiLimitationAlert();

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

          {this.filter()}
        </form>

        {helpers}

        <div>
          {
            this.state.contestList.map((contest: Contest) => (
              <div>
                <hr className="my-8 h-px bg-gray-200 border-0"></hr>
                <ContestComponent {...contest} />
              </div>
            ))
          }
        </div>

        <div className="flex items-center justify-center text-center">
          <PaginationComponent 
            currentPage={this.state.currentPage} 
            totalPages={this.state.totalPages}
            onPageChange={this.onPageChange}
          />
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