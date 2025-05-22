import { useState, useEffect } from 'react';
import API from './api';

export default function RequestAccess() {
  const [form, setForm] = useState({ software: '', accessType: '', reason: '' });
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    API.get('/software').then(res => setSoftwares(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/requests', form);
    alert('Request submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Request Access</h2>
      <select onChange={e => setForm({ ...form, software: e.target.value })}>
        <option>Select software</option>
        {softwares.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>
      <select onChange={e => setForm({ ...form, accessType: e.target.value })}>
        <option value="">Select access type</option>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <input placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}
