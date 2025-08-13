import { useState } from 'react'
function BackendTest() {
  const [message, setMessage] = useState('');
  const callBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      if (!response.ok){
        setMessage('Error: Fetch failed');
        return;
      }
      const data = await response.text(); 
      setMessage(data);
    } catch (error) {
      setMessage('Error: Could not connect to backend');
    }
  };
  return (
    <div className="p-5 border border-gray-300 m-5">
      <h3 className="text-lg font-semibold mb-4">Backend Connection Test</h3>
      <button 
        onClick={callBackend}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Test Connection to Spring Boot
      </button>
      <p className="text-gray-700">Response: {message}</p>
    </div>
  );
}
export default BackendTest