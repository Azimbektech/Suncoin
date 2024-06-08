import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ authToken }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://yourserver.com/api/users/me', {
          headers: { 'x-auth-token': authToken }
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      }
    };

    fetchProfile();
  }, [authToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
