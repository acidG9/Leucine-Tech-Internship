import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

export default function Signup({ setLoggedIn, setRole }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setLoggedIn(true);
      setRole(role);

      if (role === 'Admin') {
        navigate('/create-software');
      } else if (role === 'Manager') {
        navigate('/pending-requests');
      } else {
        navigate('/request-access');
      }
    } catch (err) {
      alert('Signup failed');
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
