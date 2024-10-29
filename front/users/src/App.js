
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!token && <li><Link to="/register">Register</Link></li>}
            {!token && <li><Link to="/login">Login</Link></li>}
            {token && <li><Link to="/dashboard">Dashboard</Link></li>}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {token && <Route path="/dashboard" element={<Dashboard token={token} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;