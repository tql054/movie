import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import '/';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Header, Footer } from './components'
import Routes_pages from './config/Routes'

function App() {
  return (
    <Router>
      <Header/>
      <Routes_pages/>
      <Footer/>
    </Router>
  );
}

export default App;
