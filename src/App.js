import logo from './logo.svg';
import './App.css';
import Converter from './components/Converter'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Url Minify</h1>
        <Converter/>
        <div className='footer'>
          © Copyright 2021 <a href='https://Daa.best' target='_blank'>Daa.best</a>
        </div>
      </header>
    </div>
  );
}

export default App;
