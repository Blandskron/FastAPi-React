import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container text-light d-flex flex-column justify-content-center align-items-center vh-100">
      <header className="hero-section text-center">
        <h1>Bienvenido a MyApp</h1>
        <p>Inicia sesión o regístrate y comienza tu viaje hacia la productividad.</p>
        <div className="hero-buttons mt-4">
          <button className="btn btn-primary">
            <Link to="/login" className="text-white">Login</Link>
          </button>
        </div>
        <p className="mt-3">
          No tienes cuenta? <Link to="/register" className="text-decoration-underline">Regístrate aquí</Link>
        </p>
      </header>
    </div>
  );
};

export default Home;