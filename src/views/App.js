import { Container } from '@material-ui/core';
import Converter from '../components/Converter'
import {header, converter, features, footer} from '../data/strings.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureList from '../components/FeatureList'

import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Header {...header} />
        <Converter strings={converter} />
        {/* <FeatureList strings={features} /> */}
        <Footer {...footer} />
      </Container>
    </div>
  );
}

export default App;
