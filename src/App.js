import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Statistic from "./pages/Statistic/Statistic";
import Navbar from "./components/Navbar/Navbar.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn/SignIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const onSignIn = (data) => {
    setLogin(data);
    if (data) navigate("/home");
  };
  return (
    <div className="App">
      <CssBaseline />
      {/* {login && <Navbar />} */}
      <Routes>
        {/* <Route path="/" element={<SignIn transfer={onSignIn} />} /> */}
        <Route path="/home" element={<Home />} />
        {/* <Route path="/statistic" element={<Statistic />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/prediction" element={<Home />} /> */}
      </Routes>
    </div>
  );
};

export default App;
