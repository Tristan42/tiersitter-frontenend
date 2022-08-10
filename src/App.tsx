import React from 'react';
import './App.css';
import Header from './components/Header';

import TiersitterApp from './components/TiersitterApp';

function App() {
  return (
    <div id='app'>
      <Header />
      <TiersitterApp />
      <footer></footer>
    </div>
  );
}

export default App;