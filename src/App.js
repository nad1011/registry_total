import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Statistic from "./pages/Statistic/Statistic";
import Prediction from "./pages/Prediction/Prediction";
import Navbar from "./components/Navbar/Navbar.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn/SignIn";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
  // const [login, setLogin] = useState(!!localStorage.getItem("login"));
  const navigate = useNavigate();

  const onSignIn = (data) => {
    if (data) {
      navigate("/statistic");
      // localStorage.setItem("login",true);
      // setLogin(true);
    }
  };

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn transfer={onSignIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
};

export default App;
