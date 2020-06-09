import React from 'react';
import styles from './App.module.css';

import Home from 'Pages/Home';
import Nav from 'Pages/Nav';

const App = () => {
  return (
    <div className={styles.App}>
      <Nav />
      <Home />
    </div>
  );
}

export default App;
