import {useEffect, useState} from 'react';
import RsInput from './components/input';
import './App.css';
import GitRepoClient, { Repo } from './lib/gitRepoClient';
import RsRepoList from './components/repo-list';

function App() {
  const [searchText, setSearchText] = useState('');
  const [repoList, setRepoList] = useState<Repo[]>([]);

  

  const onSubmit = (event: any) => {
    const gitRepoClient = new GitRepoClient();
    if (searchText) {
      gitRepoClient.getReposAsync(searchText).then((repos: Repo[]) => {
        console.log(repos);
        setRepoList(repos);
      });
    } else {
      setRepoList([]);
    }
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <RsInput onChange={(text) => setSearchText(text)} />
          <button type="submit">Search</button>
        </form>
        <RsRepoList repoList={repoList} />
      </header>
    </div>
  );
}

export default App;
