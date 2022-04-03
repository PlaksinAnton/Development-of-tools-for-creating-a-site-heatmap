import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Grid } from "./pages/Grid";
import { Product } from "./pages/Product";

import "./assets/css/style.css";
import { GraphicPage } from "./pages/GraphicPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/product" element={<Product />} />
        <Route path="/admin" element={<GraphicPage />} />
      </Routes>
    </>
  );
}

export default App;
