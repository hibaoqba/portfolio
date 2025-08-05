import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <div className="font-sans">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
