import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/api';
import './Login.css';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      setToken(data.session_token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response.data);
      alert('Error logging in');
    }
  };

  return (
    <div className="login-container bg-dark text-light d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 rounded shadow" onSubmit={handleSubmit} style={{ backgroundColor: '#2c2c2c' }}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
