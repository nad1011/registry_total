import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar.jsx';
const App =()=> {
  return (
    <div className="App">
      <Navbar/>
      <Routes>       
          <Route path="/" element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
