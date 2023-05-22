import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";
import { dexieDB, user, getDocID } from "./database/cache";

import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Statistic from "./pages/Statistic";
import Prediction from "./pages/Prediction";
import HQStatistic from "./pages/HQStatistic";
import Upload from "./pages/Upload";
import CreateAccount from "./pages/CreateAccount";
import "./App.css";

export default function App() {
  // useEffect(() => {
  //   const listener = onSnapshot(
  //     collection(fireDB, "certificate"),
  //     (snapshot) => {
  //       snapshot.docChanges().forEach(async (cert) => {
  //         const certDoc = cert.doc;
  //         const certData = certDoc.data();
  //         await dexieDB.table("certificate").put({
  //           ...certData,
  //           id: certDoc.id,
  //           car: getDocID(certData.car),
  //         });

  //         const carDoc = await getDoc(certData.car);
  //         const carData = carDoc.data();
  //         await dexieDB.table("car").put({
  //           id: carDoc.id,
  //           regNum: carData.regNum,
  //           owner: getDocID(carData.owner),
  //         });

  //         const ownerDoc = await getDoc(carData.owner);
  //         const ownerData = ownerDoc.data();
  //         await dexieDB.table("owner").put({
  //           id: ownerDoc.id,
  //           name: ownerData.name,
  //           type: ownerData.type,
  //         });
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
        <Route path="/statistic" element={user.id === "hq" ? <HQStatistic /> : <Statistic />} />
        <Route
          path="/registration"
          element={user.id === "hq" ? <CreateAccount /> : <Registration />}
        />
        <Route path="/prediction" element={user.id === "hq" ? <Upload /> : <Prediction />} />
      </Routes>
    </div>
  );
}
