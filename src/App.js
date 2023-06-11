import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";
import { dexieDB, getDocID } from "./database/cache";

import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Statistic from "./pages/Statistic/center";
import HQStatistic from "./pages/Statistic/hq";
import Registration from "./pages/Registration/center";
import HQRegistration from "./pages/Registration/hq";
import Prediction from "./pages/Prediction/center";
import HQPrediction from "./pages/Prediction/hq";

const App = () => {
  // useEffect(() => {
  //   const listener = onSnapshot(collection(fireDB, "certificate"), (snapshot) => {
  //     snapshot.docChanges().forEach(async (cert) => {
  //       const certDoc = cert.doc;
  //       const certData = certDoc.data();
  //       if (certDoc.id === "center") {
  //         await dexieDB.table("certificate").put({
  //           id: "center",
  //           codes: ["Tất cả", ...certData.codes],
  //         });
  //         return;
  //       }
  //       const certCachedData = { ...certData, id: certDoc.id };
  //       delete certCachedData.car;
  //       await dexieDB.table("certificate").put(certCachedData);
  //     });
  //   });
  //   return () => listener();
  // }, []);

  const navigate = useNavigate();
  const onSignIn = () => navigate("/home");
  const id = localStorage.getItem("id");

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn transfer={onSignIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistic" element={id === "hq" ? <HQStatistic /> : <Statistic />} />
        <Route path="/registration" element={id === "hq" ? <HQRegistration /> : <Registration />} />
        <Route path="/prediction" element={id === "hq" ? <HQPrediction /> : <Prediction />} />
      </Routes>
    </div>
  );
};

export default App;
