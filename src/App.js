import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Statistic from "./pages/Statistic/Statistic";
import Prediction from "./pages/Prediction/Prediction";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn/SignIn";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const onSignIn = (data) => {
    if (data) {
      navigate("/home");
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
