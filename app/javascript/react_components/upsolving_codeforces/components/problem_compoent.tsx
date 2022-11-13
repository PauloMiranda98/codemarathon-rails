import * as React from "react";
import { Tooltip } from "flowbite-react";
import { Problem, ProblemStatus } from "../models/problem";

export enum ProblemColors {
  NOT_TRIED = "bg-gray-700 hover:bg-gray-800",
  TRIED = "bg-red-700 hover:bg-red-800",
  UPSOLVING = "bg-blue-700 hover:bg-blue-800",
  ACCEPT = "bg-green-700 hover:bg-green-800"
}

export class ProblemComponent extends React.Component<Problem> {
  CODEFORCES_FIRST_GYM_ID = 100000;

  getUrl(contestId: number, index: string) {
    if (contestId < this.CODEFORCES_FIRST_GYM_ID) {
      return `https://codeforces.com/contest/${contestId}/problem/${index}`;
    } else {
      return `https://codeforces.com/gym/${contestId}/problem/${index}`;
    }
  }

  getColor(status: ProblemStatus) {
    switch (status) {
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
      <Tooltip content={this.props.name} placement="bottom">
        <a href={this.getUrl(this.props.contestId, this.props.index)} target="_blank" rel="noopener noreferrer">
          <button className={"w-12 h-12 " + this.getColor(this.props.status) + " text-white shadow-md text-xl focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg"}>
            {this.props.index}
          </button>
        </a>
      </Tooltip>
    );
  }
}