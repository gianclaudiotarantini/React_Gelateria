import { Route, Routes } from "react-router-dom";
import { Menu } from "./components";
import Navigation from "./components/Navigation";



function App() {
  return (
    <>
    <Navigation/>
      <Routes>
         <Route path="/" element={<Menu />} />
      </Routes>
      </>
  );
}

export default App;
