import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Shop from "./pages/Shop";
import Mail from "./pages/Mail";
import Navbar from "./components/Navbar/Navbar.jsx";
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </div>
  );
};

export default App;
