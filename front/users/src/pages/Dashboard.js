
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me/', {
          headers: { Authorization: token },
        });
        setUserData(response.data);
        setFormData(response.data); // Inicializa formData con valores actuales del usuario
      } catch (error) {
        alert('Error fetching user data');
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.put('http://localhost:8000/users/me/', data, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUserData(response.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {userData.last_name && <p>Last Name: {userData.last_name}</p>}
          {userData.address && <p>Address: {userData.address}</p>}
          {userData.profile_picture && <img src={`http://localhost:8000${userData.profile_picture}`} alt="Profile" />}
          {/* Botón para alternar entre visualizar y editar datos */}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <form onSubmit={handleSubmit}>
              <input 
                name="last_name" 
                placeholder="Last Name" 
                value={formData.last_name || ''} 
                onChange={handleChange} 
              />
              <input 
                name="address" 
                placeholder="Address" 
                value={formData.address || ''} 
                onChange={handleChange} 
              />
              <input 
                name="profile_picture" 
                type="file" 
                accept="image/*" 
                onChange={handleChange} 
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;