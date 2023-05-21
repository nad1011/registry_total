import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";
import { dexieDB, user } from "./database/cache";

import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Statistic from "./pages/Statistic";
import Prediction from "./pages/Prediction";
import HQStatistic from "./pages/HQStatistic";
import "./App.css";
import { user } from "./database/cache";
import HqStatistic from "./pages/HqStatistic/HqStatistic";
import CreateAccount from "./pages/CreateAccount";
import Upload from "./pages/Upload";

export default function App() {
  //load listener
  useEffect(() => {
    const listener = onSnapshot(
      collection(fireDB, "certificate"),
      (snapshot) => {
        snapshot.docChanges().forEach((cert) => {});
      },
      (error) => {
        console.log(error.name);
        console.trace(error.message);
      }
    );
    return () => listener();
  }, []);

  const navigate = useNavigate();
  const onSignIn = () => navigate("/home");

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn transfer={onSignIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistic" element={user.id === "hq" ? <HqStatistic /> : <Statistic />} />
        <Route
          path="/registration"
          element={user.id === "hq" ? <CreateAccount /> : <Registration />}
        />
        <Route path="/prediction" element={user.id === "hq" ? <Upload /> : <Prediction />} />
      </Routes>
    </div>
  );
}
