import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './assets/Signup';
import Login from './assets/Login';
import CreateSoftware from './assets/CreateSoftware';
import RequestAccess from './assets/RequestAccess';
import PendingRequests from './assets/PendingRequests';
import Navbar from './assets/Navbar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role') || '');
  }, []);

  const getHomeRoute = () => {
    if (!loggedIn) return '/login';
    if (role === 'Admin') return '/create-software';
    if (role === 'Manager') return '/pending-requests';
    return '/request-access';
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={getHomeRoute()} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setRole={setRole} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setRole={setRole} />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
      </Routes>
    </Router>
  );
};

export default App;
