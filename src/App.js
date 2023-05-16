import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Statistic from "./pages/Statistic/Statistic";
import Prediction from "./pages/Prediction/Prediction";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { user } from "./database/dexie";

const App = () => {
  const navigate = useNavigate();

  const onSignIn = () => navigate("/home");

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn transfer={onSignIn} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/statistic"
          element={user.id === "hq" ? <pageForHq></pageForHq> : <Statistic />}
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
};

export default App;
