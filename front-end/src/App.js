// import { HomePage } from './pages/HomePage.jsx';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { Grid } from "./pages/Grid";
import { Product } from "./pages/Product";
import ReactDOM from 'react-dom';
import * as V from 'victory';

import './assets/css/style.css';
import {GraphicPage} from "./pages/GraphicPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<GraphicPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
