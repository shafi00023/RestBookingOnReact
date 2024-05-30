import React from 'react';
import './App.css';
import HelloWorld from './helloWorld';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld />
      </header>
    </div>
  );
}

export default App;
