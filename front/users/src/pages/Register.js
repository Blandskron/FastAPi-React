import React, { useState } from 'react';
import { registerUser } from '../api/api';
import './Register.css'; // Archivo CSS para personalizaciones adicionales

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful');
    } catch (error) {
      console.error(error.response.data); // Para depurar el problema específico
      alert('Error registering user');
    }
  };

  return (
    <div className="register-container bg-dark text-light d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 rounded shadow" onSubmit={handleSubmit} style={{ backgroundColor: '#2c2c2c' }}>
        <h2 className="text-center mb-4">Register</h2>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;