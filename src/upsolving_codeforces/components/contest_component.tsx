import * as React from 'react';
import { Contest } from '../models/contest';
import { ProblemComponent } from './problem_component';

export class ContestComponent extends React.Component<Contest> {
  getSubtitle(members: Array<string>): string {
    if (members.length === 1) {
      return 'Individual: ' + members[0];
    } else {
      return 'Em equipe: ' + members.join(', ');
    }
  }

  render() {
    return (
      <div className="my-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white">
          {this.props.contestName}
        </h2>

        <h3 className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400 mt-1">
          {this.getSubtitle(this.props.members)}
        </h3>

        <ul className="flex flex-wrap justify-center gap-2 my-4">
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
