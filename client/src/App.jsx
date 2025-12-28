import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CVBuilder from './components/CVBuilder';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Generate or get user ID
    const generateUserId = async () => {
      try {
        const storedUserId = localStorage.getItem('cvGeneratorUserId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          const response = await axios.post('/api/users/generate-id');
          const newUserId = response.data.userId;
          localStorage.setItem('cvGeneratorUserId', newUserId);
          setUserId(newUserId);
        }
      } catch (error) {
        console.error('Error generating user ID:', error);
      }
    };

    generateUserId();
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<CVBuilder userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;