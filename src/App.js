import {  Route, Routes } from "react-router-dom";
import { Menu } from "./components";
import ProductDetail from "./components/ProductDetail";




function App() {
  return (
    <>
    
      <Routes>
         <Route path="/" element={<Menu />} />
         <Route path="/product/:id" Component={ProductDetail} />

      </Routes>
      </>
  );
}

export default App;
