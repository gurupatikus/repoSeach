import React from "react";
import { Repo } from "../lib/gitRepoClient";

interface InputProps {
    repoList: Repo[];
  }
  
  interface InputState {
  }

class RsRepoList extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
    }

  render() {
    return (
      <ul>
        {this.props.repoList.map((repo: Repo) => {
            return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    );
  }
}

export default RsRepoList;