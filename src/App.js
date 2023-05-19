import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";

import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Statistic from "./pages/Statistic";
import Prediction from "./pages/Prediction";
import "./App.css";

export default function App() {
  //load listener
  // useEffect(() => {
  //   const listener = onSnapshot(
  //     collection(fireDB, "certificate"),
  //     (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         const doc = change.doc;
  //         if (change.type === "removed") {
  //         } else {
  //         }
  //       });
  //     },
  //     (error) => {
  //       alert(error.name);
  //       console.trace(error.message);
  //     }
  //   );
  //   return () => listener();
  // }, []);

  const navigate = useNavigate();
  const onSignIn = () => navigate("/home");

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
}
