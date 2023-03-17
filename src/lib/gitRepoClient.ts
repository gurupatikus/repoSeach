import axiosClient from "./axiosClient";

export interface Repos {
    items: Repo[];
    pageCount: number;
}

export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    owner: {
        login: string;
        html_url: string;
    };
  }

interface RepoResponse {
    items: Repo[];
    total_count: number;
}

class GitRepoClient {
    readonly _githubBaseUrl: string = 'https://api.github.com';
    readonly perPage = 10;
    readonly maxPageCount = 1000 / this.perPage;

    public async getReposAsync(repoName: string, page = 1): Promise<Repos> {
        return axiosClient.get(`${this._githubBaseUrl}/search/repositories?q=${repoName}&page=${page}&per_page=${this.perPage}`).then((response) => {
            const data: RepoResponse = response.data;
            let pageCount = data.total_count / this.perPage;
            if (pageCount > this.maxPageCount) {
                pageCount = this.maxPageCount;
            }
            let repos: Repos = { items: [], pageCount: pageCount };
            repos.items = data.items.map<Repo>((repo) => {
                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    html_url: repo.html_url,
                    language: repo.language,
                    stargazers_count: repo.stargazers_count,
                    owner: {
                        login: repo.owner.login,
                        html_url: repo.owner.html_url
                    }
                }
            });
            return repos;
        });
    }
}

export default GitRepoClient;