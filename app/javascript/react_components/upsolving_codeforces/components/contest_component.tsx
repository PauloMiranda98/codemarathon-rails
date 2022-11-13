import * as React from "react";
import { Contest } from "../models/contest";
import { ProblemComponent } from "./problem_compoent";

export class ContestComponent extends React.Component<Contest> {
  getSubtitle(members: Array<string>): string {
    if (members.length == 1) {
      return "Individual: " + members[0];
    } else {
      return "Em equipe: " + members.join(", ");
    }
  }

  render() {
    return (
      <div className="my-4">
        <h2 className="text-2xl font-bold text-center">
          {this.props.contestName}
        </h2>

        <h2 className="text-md text-center">
          {this.getSubtitle(this.props.members)}
        </h2>

        <ul className="flex flex-wrap justify-center gap-2 my-2">
          {this.props.problemList.map((problem) => (
            <li key={problem.index}>
              <ProblemComponent {...problem} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}