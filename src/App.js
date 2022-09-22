import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home  from "./components/Home.js";
import {Login} from "./components/Login.js"



function App() {


  return (
    <div className="App">
{/* <Appstate> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
      {/* </Appstate> */}
    </div>
  );
}

export default App;

