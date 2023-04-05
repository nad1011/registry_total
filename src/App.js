import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/ShopPage/Shop";
import Mail from "./pages/Mail";
import Navbar from "./components/Navbar/Navbar.jsx";
import SignInPage from "./pages/SignInPage/SignInPage";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/auth" element={<SignInPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
