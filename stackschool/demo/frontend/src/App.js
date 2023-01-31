import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const URL = "http://localhost:8080";

function App() {
  //Gets the entire feed
  function getFeed() {
    axios.get(URL + "/feed")
        .then(response => { 
          console.log(response.data);
        })
        .catch(console.error)
  }

  getFeed();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
