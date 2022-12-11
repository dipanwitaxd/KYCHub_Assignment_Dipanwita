import './App.css';
import SideBarAndNavBar from './components/NavBar/SideBarAndNavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from './components/ProductDetails/ProductDetails';
import CompareProducts from './components/CompareProduct/CompareProducts';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductDetails />}></Route>
      <Route path="compare-product" element={<CompareProducts />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
