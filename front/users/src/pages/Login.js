
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setToken(response.data.session_token);
      alert('Login successful');
    } catch (error) {
      console.error(error.response.data);  // Para depurar el problema específico
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="name" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;