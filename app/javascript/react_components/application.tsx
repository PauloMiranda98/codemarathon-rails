import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppProps {
  arg: string;
}

const App = ({ arg }: AppProps) => {
  return <div>{`Hello, ${arg}!`}</div>;
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root-to-react");
  
  if(rootEl){
    ReactDOM.render(<App arg="Rails 7 with ESBuild" />, rootEl);
  }
});