import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home  from "./components/Home.js";
import {Login} from "./components/Login.js"
import {Register} from "./components/Register.js"
import {NotFound} from "./components/NotFound.js"
import {ForgetPassword} from "./components/ForgetPassword.js"
import {ChangePassword} from "./components/ChangePassword.js"
import {AdminLogin} from "./components/AdminLogin.js"
import CategoryDisplay from  "./components/CategoryDisplay.js"



function App() {


  return (
    <div className="App">
{/* <Appstate> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route path="/food/:category" element={<CategoryDisplay />} />
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/404-Page" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404-Page" />} />
      </Routes>
      {/* appstate not required here */}
      {/* </Appstate> */}
    </div>
  );
}

export default App;

