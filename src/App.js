import logo from './logo.svg';
import './App.css';
import Converter from './components/Converter'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Url Shrink</h1>
        <Converter/>
      </header>
    </div>
  );
}

export default App;
