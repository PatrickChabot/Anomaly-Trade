import { useState } from 'react'

function BackendTest() {
  const [message, setMessage] = useState('');

  const callBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error: Could not connect to backend');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Backend Connection Test</h3>
      <button onClick={callBackend}>Test Connection to Spring Boot</button>
      <p>Response: {message}</p>
    </div>
  );
}

export default BackendTest