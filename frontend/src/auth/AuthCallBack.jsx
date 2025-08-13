import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const AuthCallBack = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth(); 

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Step 1: Get code from URL
        const code = searchParams.get('code');
        
        // Check if code exists
        if (!code) {
          throw new Error('No authorization code received from Google');
        }

        // Step 2: Send to Spring Boot
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code })
        });

        // Step 3: Check if response is successful
        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.status}`);
        }

        // Get the JSON data
        const data = await response.json();

        // Check if we got what we need
        if (!data.token) {
          throw new Error('No JWT token received from server');
        }

        // Step 4: Call AuthContext to store token and user data
        login(data.token, data.user);
        setSuccess(true);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, login]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg">Loading please wait</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div>{error}</div>
          <button onClick={() => navigate('/login')}>Try Again</button>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Login successful! Redirecting...</p>
        </div>
      </div>
    );
  }

  return <div>Something went wrong</div>;
};

export default AuthCallBack;