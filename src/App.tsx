import React, {useState} from 'react';
import logo from './logo.svg';
import RsInput from './components/input';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <RsInput onChange={(text) => setSearchText(text)} />
        </form>
        <div>{searchText}</div>
      </header>
    </div>
  );
}

export default App;
