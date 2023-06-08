import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { fireDB } from "./database/firebase";
import { dexieDB, user, getDocID } from "./database/cache";

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
  //           codes: ["Tất cả", ...certData.codes],
  //           id: "center",
  //         });
  //         return;
  //       }

  //       await dexieDB.table("certificate").put({
  //         ...certData,
  //         id: certDoc.id,
  //         car: getDocID(certData.car),
  //       });

  //       const carDoc = await getDoc(certData.car);
  //       const carData = carDoc.data();
  //       await dexieDB.table("car").put({
  //         id: carDoc.id,
  //         regNum: carData.regNum,
  //         owner: getDocID(carData.owner),
  //       });

  //       const ownerDoc = await getDoc(carData.owner);
  //       const ownerData = ownerDoc.data();
  //       await dexieDB.table("owner").put({
  //         id: ownerDoc.id,
  //         name: ownerData.name,
  //         address: ownerData.address,
  //         tel: ownerData.tel,
  //         type: ownerData.type,
  //       });
  //     });
  //   });

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
          element={user.id === "hq" ? <HQRegistration /> : <Registration />}
        />
        <Route path="/prediction" element={user.id === "hq" ? <HQPrediction /> : <Prediction />} />
      </Routes>
    </div>
  );
};

export default App;
