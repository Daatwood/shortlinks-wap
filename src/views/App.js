import { Container } from '@material-ui/core';
import Converter from '../components/Converter'
import strings from '../data/strings.json'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Header {...strings.header} />
        <Converter strings={strings.converter} />
        <Footer {...strings.footer} />
      </Container>
    </div>
  );
}

export default App;
