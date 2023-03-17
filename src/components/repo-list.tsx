import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Repo, Repos } from "../lib/gitRepoClient";
import "./repo-list.css";

interface InputProps {
    repoList: Repos;
    onPageChange: (page: number) => void;
  }
  
  interface InputState {
    paginationEnabled: boolean;
  }

class RsRepoList extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = { paginationEnabled: true };
    }

    handlePageClick = (data: any) => {
        if (this.state?.paginationEnabled === true) {
            this.setState({ paginationEnabled: false });
            let selected = data.selected + 1;

            // to not exceed the rate limit
            setTimeout(() => {
                this.setState({ paginationEnabled: true });
            }, 1000);
            this.props.onPageChange(selected);
        }
    };

  render() {
    return (
        <div className="repo-list-container">
            <ul className="repo-list">
                {this.props.repoList.items.map((repo: Repo) => {
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
            <div className="pagination-container">
                {this.props.repoList.pageCount > 1 && !this.state.paginationEnabled && <div className="pagination-hover"></div>}
                {this.props.repoList.pageCount > 1 &&
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={this.handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        disableInitialCallback={true}
                        pageCount={Math.ceil(this.props.repoList.pageCount)}
                        previousLabel="<"
                        containerClassName={this.state.paginationEnabled ? "pagination" : "pagination disabled"}
                    />
                }
            </div>
            
        </div>
    );
  }
}

export default RsRepoList;