import React from 'react';
import './styles/App.css';
import AutoComplete from './components/AutoComplete';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dog Autocomplete</h1>
        <p>This application is a React component that suggests dog breeds as you type 
          and returns a photo of the dog breed you search for.</p>
        <p>Built with React and <a className="App-link" href="https://dog.ceo/dog-api">The Dog API</a>.</p>
      </header>
      <main className="App-main">
        <AutoComplete/>
      </main>
    </div>
  );
}

export default App;
