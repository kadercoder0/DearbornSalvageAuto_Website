import './App.css';
import Login from './Features/LoginSignup/login';
import Home from './Features/home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
