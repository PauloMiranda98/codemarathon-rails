import * as React from "react";

export class ContestLegendComponent extends React.Component {
  render() {
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
      </div>
    )
  }
}