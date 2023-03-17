import axiosClient from "./axiosClient";

export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    owner: {
        login: string;
        html_url: string;
    };
  }

  interface RepoResponse {
    items: Repo[];
  }

class GitRepoClient {
    readonly _githubBaseUrl: string = 'https://api.github.com';

    public async getReposAsync(repoName: string): Promise<Repo[]> {
        return axiosClient.get(`${this._githubBaseUrl}/search/repositories?q=${repoName}`).then((response) => {
            const data: RepoResponse = response.data;
            return data.items.map<Repo>((repo) => {
                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    html_url: repo.html_url,
                    language: repo.language,
                    owner: {
                        login: repo.owner.login,
                        html_url: repo.owner.html_url
                    }
                }
            });
        });
    }
}

export default GitRepoClient;