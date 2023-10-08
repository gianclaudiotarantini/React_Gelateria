import { Route, Routes } from "react-router-dom";
import { Menu } from "./components";




function App() {
  return (
    <>
    
      <Routes>
         <Route path="/" element={<Menu />} />
      </Routes>
      </>
  );
}

export default App;
