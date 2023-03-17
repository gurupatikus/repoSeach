import React from "react";
import { Repo } from "../lib/gitRepoClient";
import "./repo-list.css";

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
        <div className="repo-list-container">
            <ul className="repo-list">
                {this.props.repoList.map((repo: Repo) => {
                    return <li key={repo.id} className="repo-list-item">
                        <a href={repo.html_url} target="_blank">{repo.name}</a>
                        <div>
                            <div><b>Description:</b> {repo.description}</div>
                            <div><b>Owner:</b> {repo.owner.login}</div>
                            <div><b>Stars:</b> {repo.stargazers_count}</div>
                        </div>
                    </li>;
                })}
            </ul>
        </div>
    );
  }
}

export default RsRepoList;