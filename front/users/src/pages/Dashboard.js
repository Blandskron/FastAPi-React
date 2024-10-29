
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me/', {
          headers: { Authorization: token },
        });
        setUserData(response.data);
      } catch (error) {
        alert('Error fetching user data');
      }
    };
    
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display more user data as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;