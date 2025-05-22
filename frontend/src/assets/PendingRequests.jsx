import { useEffect, useState } from 'react';
import API from './api';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get('/requests').then(res => setRequests(res.data));
  }, []);

  const updateStatus = (id, status) => {
    API.patch(`/requests/${id}`, { status }).then(() => {
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    });
  };

  return (
    <div className="form">
      <h2>Pending Requests</h2>
      {requests.map(req => (
        <div key={req._id} className="card">
          <p><b>User:</b> {req.user.username}</p>
          <p><b>Software:</b> {req.software.name}</p>
          <p><b>Access:</b> {req.accessType}</p>
          <p><b>Reason:</b> {req.reason}</p>
          <p><b>Status:</b> {req.status}</p>
          {req.status === 'Pending' && (
            <>
              <button onClick={() => updateStatus(req._id, 'Approved')}>Approve</button>
              <button onClick={() => updateStatus(req._id, 'Rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
