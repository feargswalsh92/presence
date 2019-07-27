import React from 'react';
import logo from './logo.svg';
import Home from './Home.jsx';
import lake from './assets/lake.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style = {styles.backgroundContainer}>
       <Home/>
      </header>
    </div>
  );
}

const styles = {
  backgroundContainer: {
    /* Center and scale the image nicely */
    backgroundImage: `url(${lake})`,
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: 'auto',
  }
}

export default App;
