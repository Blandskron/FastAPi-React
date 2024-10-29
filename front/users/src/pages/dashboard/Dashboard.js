import React, { useEffect, useState } from 'react';
import { fetchUserData, updateUserData } from '../../api/api';
import { API_URL } from '../../api/constants';
import './Dashboard.css'; // Asegúrate de crear un archivo CSS para los estilos

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData(token);
        setUserData(data);
        setFormData(data);
      } catch (error) {
        alert('Error fetching user data');
      }
    };

    if (token) {
      loadData();
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
      const updatedData = await updateUserData(token, data);
      setUserData(updatedData);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="text-center mb-4">Dashboard</h2>
        {userData ? (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {userData.last_name && <p><strong>Last Name:</strong> {userData.last_name}</p>}
            {userData.address && <p><strong>Address:</strong> {userData.address}</p>}
            {userData.profile_picture && (
              <img
                src={`${API_URL}${userData.profile_picture}`}
                alt="Profile"
                className="profile-img mb-3"
              />
            )}
            <button className="btn btn-outline-light w-100 mb-3" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <form onSubmit={handleSubmit}>
                <input
                  name="last_name"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  value={formData.last_name || ''}
                  onChange={handleChange}
                />
                <input
                  name="address"
                  className="form-control mb-3"
                  placeholder="Address"
                  value={formData.address || ''}
                  onChange={handleChange}
                />
                <input
                  name="profile_picture"
                  type="file"
                  accept="image/*"
                  className="form-control mb-3"
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-outline-light w-100">
                  Update
                </button>
              </form>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;