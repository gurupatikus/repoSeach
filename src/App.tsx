import {useEffect, useState} from 'react';
import RsInput from './components/input';
import './App.css';
import GitRepoClient, { Repo, Repos } from './lib/gitRepoClient';
import RsRepoList from './components/repo-list';

function App() {
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [repoList, setRepoList] = useState<Repos>({ items: [], pageCount: 0});

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  const onSubmit = (event: any) => {
    submitForm();
    event.preventDefault();
  };

  const submitForm = () => {
    const gitRepoClient = new GitRepoClient();
    if (searchText) {
      gitRepoClient.getReposAsync(searchText, pageNumber).then((repos: Repos) => {
        setRepoList(repos);
      });
    } else {
      setRepoList({ items: [], pageCount: 0});
    }
  };

  const onKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      submitForm();
      event.preventDefault();
    }
  };

  useEffect(() => {
    submitForm();
  }, [pageNumber]);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
          <RsInput onChange={(text) => setSearchText(text)} />
          <button type="submit">Search</button>
        </form>
        <RsRepoList repoList={repoList} onPageChange={(page: number) => {onPageChange(page)}} />
      </header>
    </div>
  );
}

export default App;
