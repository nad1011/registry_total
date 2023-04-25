import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Shop from "./pages/ShopPage/Shop";
import Mail from "./pages/Mail";
import Navbar from "./components/Navbar/Navbar.jsx";
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from "./pages/SignIn/SignIn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const onSignIn = (data) => {
    setLogin(data);
    if (data) navigate("/home");
  };
  return (
    <div className="App">
      <CssBaseline />
      {login && <Navbar />}
      <Routes>
        <Route path="/" element={<SignIn tranfer={onSignIn}/>} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </div>
  );
};

export default App;
